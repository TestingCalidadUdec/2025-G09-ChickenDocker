"""
Módulo que define los esquemas (schemas) de Pydantic para la entidad Exercise.

Estos esquemas se utilizan para la validación de datos, serialización y documentación
automática de la API para las operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
relacionadas con los ejercicios.
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from app.models.exercise import ExerciseType

# pylint: disable=too-few-public-methods
class ExerciseBase(BaseModel):
    """
    Esquema base para un ejercicio.

    Contiene los campos comunes que se comparten en la creación y lectura de un ejercicio.
    """
    name: str
    description: Optional[str] = None
    exercise_type: ExerciseType
    muscle_group: Optional[str] = None
    equipment: Optional[str] = None
    instructions: Optional[str] = None
    is_active: bool = True


class ExerciseCreate(ExerciseBase):
    """
    Esquema utilizado para crear un nuevo ejercicio.

    Hereda todos los campos de `ExerciseBase`. Se utiliza para validar los datos
    de entrada al crear un nuevo registro de ejercicio en la base de datos.
    """

# pylint: disable=too-few-public-methods
class ExerciseUpdate(BaseModel):
    """
    Esquema utilizado para actualizar un ejercicio existente.

    Todos los campos son opcionales, lo que permite actualizaciones parciales (PATCH).
    Solo los campos proporcionados en la solicitud serán actualizados.
    """
    name: Optional[str] = None
    description: Optional[str] = None
    exercise_type: Optional[ExerciseType] = None
    muscle_group: Optional[str] = None
    equipment: Optional[str] = None
    instructions: Optional[str] = None
    is_active: Optional[bool] = None


class ExerciseInDBBase(ExerciseBase):
    """
    Esquema base para un ejercicio tal como se representa en la base de datos.

    Hereda de `ExerciseBase` y añade campos que son gestionados por la base
    de datos, como el ID y las marcas de tiempo de creación/actualización.
    """
    id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        """
        Configuración del modelo Pydantic.

        from_attributes = True: Permite que el modelo Pydantic se cree a partir
        de un modelo de ORM (como SQLAlchemy) directamente, leyendo los datos
        desde sus atributos en lugar de un diccionario.
        """
        from_attributes = True


class Exercise(ExerciseInDBBase):
    """
    Esquema principal para representar un ejercicio leído desde la base de datos.

    Este es el modelo que se utilizará para devolver datos de ejercicios
    desde la API al cliente. Contiene la representación completa de un
    ejercicio almacenado.
    """
