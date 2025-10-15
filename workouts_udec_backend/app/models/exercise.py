"""
Este módulo define el modelo de la base de datos para los ejercicios.

Utiliza SQLAlchemy para declarar la estructura de la tabla 'exercises',
incluyendo sus columnas, tipos de datos y relaciones.
"""

import enum
from sqlalchemy import Column, Integer, String, Boolean, Text, Enum
from sqlalchemy.sql import func
from sqlalchemy import DateTime
from app.db.base_class import Base


class ExerciseType(enum.Enum):
    """
    Enumeración para los tipos de ejercicios disponibles.

    Define las categorías en las que se puede clasificar un ejercicio.
    """

    WEIGHT_BASED = "WEIGHT_BASED"
    TIME_BASED = "TIME_BASED"


# pylint: disable=too-few-public-methods
class Exercise(Base):
    """
    Representa un ejercicio en la base de datos.

    Esta clase es un modelo ORM (Object-Relational Mapping) de SQLAlchemy
    que se mapea a la tabla 'exercises'. Cada atributo de la clase representa
    una columna en la tabla.
    """

    __tablename__ = "exercises"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=True)
    exercise_type = Column(Enum(ExerciseType), nullable=False)
    muscle_group = Column(String, nullable=True)
    equipment = Column(String, nullable=True)
    instructions = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
