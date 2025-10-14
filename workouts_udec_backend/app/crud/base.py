"""Clases base para operaciones CRUD (Crear, Leer, Actualizar, Eliminar)."""
from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.db.base_class import Base

# Cambiado para cumplir con el estilo de nombres recomendado por Pylint para TypeVars
ModelT = TypeVar("ModelT", bound=Base)
CreateSchemaT = TypeVar("CreateSchemaT", bound=BaseModel)
UpdateSchemaT = TypeVar("UpdateSchemaT", bound=BaseModel)


class CRUDBase(Generic[ModelT, CreateSchemaT, UpdateSchemaT]):
    """Clase base para operaciones CRUD en un modelo de SQLAlchemy."""

    def __init__(self, model: Type[ModelT]):
        """Inicializa el CRUDBase con un modelo de SQLAlchemy."""
        self.model = model

    def get(self, db: Session, obj_id: Any) -> Optional[ModelT]:
        """Obtiene un único registro por su ID."""
        # Se renombró 'id' a 'obj_id' para evitar sobreescribir la función nativa id()
        return db.query(self.model).filter(self.model.id == obj_id).first()

    def get_multi(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[ModelT]:
        """Recupera múltiples registros con paginación opcional."""
        return db.query(self.model).offset(skip).limit(limit).all()

    def create(self, db: Session, *, obj_in: CreateSchemaT) -> ModelT:
        """Crea un nuevo registro en la base de datos."""
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: ModelT,
        obj_in: Union[UpdateSchemaT, Dict[str, Any]]
    ) -> ModelT:
        """Actualiza un registro existente en la base de datos."""
        obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            # Usar .model_dump() para Pydantic v2+
            update_data = obj_in.model_dump(exclude_unset=True)
        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, obj_id: int) -> Optional[ModelT]:
        """Elimina un registro de la base de datos."""
        # Se renombró 'id' a 'obj_id'
        obj = db.query(self.model).get(obj_id)
        if obj:
            db.delete(obj)
            db.commit()
        return obj
    