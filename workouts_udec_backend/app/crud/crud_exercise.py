"""
Definición de las operaciones CRUD para el modelo Exercise.

Este módulo contiene la clase CRUDExercise, que encapsula toda la lógica
para interactuar con la tabla 'exercises' en la base de datos (Crear, Leer,
Actualizar, Borrar).

Además de las operaciones básicas heredadas de CRUDBase, se incluyen
métodos específicos para obtener ejercicios activos y para filtrarlos
por grupo muscular.

Se exporta una instancia `exercise` para ser utilizada directamente en las
rutas (endpoints) de la API.
"""

from typing import List
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.exercise import Exercise
from app.schemas.exercise import ExerciseCreate, ExerciseUpdate


class CRUDExercise(CRUDBase[Exercise, ExerciseCreate, ExerciseUpdate]):
    """
    Objeto CRUD para el modelo Exercise.
    Hereda de CRUDBase y añade métodos específicos para buscar ejercicios.
    """

    def get_active(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[Exercise]:
        """
        Obtiene una lista de ejercicios que están marcados como activos.

        Args:
            db (Session): La sesión de la base de datos.
            skip (int): El número de registros a saltar (para paginación).
            limit (int): El número máximo de registros a devolver.

        Returns:
            List[Exercise]: Una lista de instancias del modelo Exercise.
        """
        return (
            db.query(self.model)
            .filter(self.model.is_active == True)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_by_muscle_group(self, db: Session, *, muscle_group: str) -> List[Exercise]:
        """
        Obtiene una lista de ejercicios activos filtrados por un grupo muscular específico.

        Args:
            db (Session): La sesión de la base de datos.
            muscle_group (str): El nombre del grupo muscular por el cual filtrar.

        Returns:
            List[Exercise]: Una lista de instancias del modelo Exercise que coinciden con el
                            grupo muscular y están activas.
        """
        return (
            db.query(self.model)
            .filter(
                self.model.muscle_group == muscle_group, self.model.is_active is True
            )
            .all()
        )


exercise = CRUDExercise(Exercise)
