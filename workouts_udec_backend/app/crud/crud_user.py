"""Operaciones CRUD para usuarios."""

from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session

from app.core.security import get_password_hash, verify_password
from app.crud.base import CRUDBase
from app.models.user import User
from app.models.workout import (
    ExerciseSet,
    Workout,
    WorkoutExercise,
    WorkoutTemplate,
)
from app.schemas.user import UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    """Métodos CRUD para el modelo User con acciones específicas."""

    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        """Obtiene un usuario por su dirección de correo electrónico."""
        return db.query(User).filter(User.email == email).first()

    def get_by_username(self, db: Session, *, username: str) -> Optional[User]:
        """Obtiene un usuario por su nombre de usuario."""
        return db.query(User).filter(User.username == username).first()

    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        """Crea un nuevo usuario."""
        db_obj = User(
            email=obj_in.email,
            username=obj_in.username,
            hashed_password=get_password_hash(obj_in.password),
            full_name=obj_in.full_name,
            is_active=obj_in.is_active,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: User, obj_in: Union[UserUpdate, Dict[str, Any]]
    ) -> User:
        """Actualiza la información de un usuario."""
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(exclude_unset=True)
        if update_data.get("password"):
            hashed_password = get_password_hash(update_data["password"])
            del update_data["password"]
            update_data["hashed_password"] = hashed_password
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def authenticate(self, db: Session, *, email: str, password: str) -> Optional[User]:
        """Autentica un usuario por correo electrónico y contraseña."""
        user = self.get_by_email(db, email=email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    def is_active(self, user: User) -> bool:
        """Verifica si un usuario está activo."""
        return user.is_active

    def is_admin(self, user: User) -> bool:
        """Verifica si un usuario es administrador."""
        return user.is_admin

    def delete_with_cascade(self, db: Session, *, user_id: int) -> None:
        """Elimina un usuario y todos sus datos asociados, respetando las claves foráneas."""
        # 1. Obtener los IDs de los elementos relacionados
        user_workout_ids = (
            db.query(Workout.id).filter(Workout.user_id == user_id).subquery()
        )
        workout_exercise_ids = (
            db.query(WorkoutExercise.id)
            .filter(WorkoutExercise.workout_id.in_(user_workout_ids))
            .subquery()
        )

        # 2. Eliminar los "nietos" (ExerciseSet)
        db.query(ExerciseSet).filter(
            ExerciseSet.workout_exercise_id.in_(workout_exercise_ids)
        ).delete(synchronize_session=False)

        # 3. Eliminar los "hijos" (WorkoutExercise)
        db.query(WorkoutExercise).filter(
            WorkoutExercise.workout_id.in_(user_workout_ids)
        ).delete(synchronize_session=False)

        # 4. Eliminar dependientes directos (Workout, WorkoutTemplate)
        db.query(Workout).filter(Workout.user_id == user_id).delete(
            synchronize_session=False
        )
        db.query(WorkoutTemplate).filter(WorkoutTemplate.created_by == user_id).delete(
            synchronize_session=False
        )

        # 5. Finalmente, eliminar el usuario
        self.remove(db, id=user_id)

        db.commit()


user = CRUDUser(User)
