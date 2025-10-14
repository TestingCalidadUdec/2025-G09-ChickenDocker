"""
Módulo que define los esquemas (schemas) de Pydantic para la gestión de entrenamientos.

Contiene los modelos para:
- WorkoutTemplate: Plantillas de entrenamiento reutilizables.
- Workout: Sesiones de entrenamiento específicas realizadas por un usuario.
- Sus componentes anidados como ejercicios y series (sets).
"""
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from app.schemas.exercise import Exercise

# pylint: disable=too-few-public-methods
class WorkoutTemplateExerciseBase(BaseModel):
    """
    Esquema base para un ejercicio dentro de una plantilla de entrenamiento.

    Define la configuración sugerida para un ejercicio, como el orden, series,
    repeticiones, peso y/o duración.
    """
    exercise_id: int
    order_index: int
    suggested_sets: Optional[int] = None
    suggested_reps: Optional[int] = None
    suggested_weight: Optional[float] = None
    suggested_duration: Optional[int] = None

# pylint: disable=too-few-public-methods
class WorkoutTemplateExerciseCreate(WorkoutTemplateExerciseBase):
    """
    Esquema para crear la asociación de un ejercicio a una plantilla.

    Se utiliza al crear una `WorkoutTemplate` para validar los datos de cada
    ejercicio que la compone.
    """

# pylint: disable=too-few-public-methods
class WorkoutTemplateExercise(WorkoutTemplateExerciseBase):
    """
    Esquema completo para un ejercicio dentro de una plantilla.

    Representa la asociación leída desde la base de datos, incluyendo los IDs
    y el objeto `Exercise` completo con sus detalles.
    """
    id: int
    template_id: int
    exercise: Exercise

    class Config:
        """Configuración del modelo Pydantic."""
        from_attributes = True

# pylint: disable=too-few-public-methods
class WorkoutTemplateBase(BaseModel):
    """
    Esquema base para una plantilla de entrenamiento.

    Contiene los campos fundamentales como nombre, descripción y si es pública.
    """
    name: str
    description: Optional[str] = None
    is_public: bool = False

# pylint: disable=too-few-public-methods
class WorkoutTemplateCreate(WorkoutTemplateBase):
    """
    Esquema para crear una nueva plantilla de entrenamiento.

    Incluye una lista de los ejercicios que la componen, utilizando el esquema
    `WorkoutTemplateExerciseCreate`.
    """
    exercises: List[WorkoutTemplateExerciseCreate] = []

# pylint: disable=too-few-public-methods
class WorkoutTemplateUpdate(BaseModel):
    """
    Esquema para actualizar una plantilla de entrenamiento existente.

    Todos los campos son opcionales para permitir actualizaciones parciales.
    """
    name: Optional[str] = None
    description: Optional[str] = None
    is_public: Optional[bool] = None

# pylint: disable=too-few-public-methods
class WorkoutTemplate(WorkoutTemplateBase):
    """
    Esquema para representar una plantilla de entrenamiento completa.

    Este modelo se usa en las respuestas de la API. Incluye metadatos como
    el ID, el creador, fechas y la lista completa de sus ejercicios.
    """
    id: int
    created_by: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    template_exercises: List[WorkoutTemplateExercise] = []

    class Config:
        """Configuración del modelo Pydantic."""
        from_attributes = True

# pylint: disable=too-few-public-methods
class ExerciseSetBase(BaseModel):
    """
    Esquema base para una serie (set) de un ejercicio.

    Define los detalles de una única serie, como el número de repeticiones,
    el peso levantado, la duración y si se completó.
    """
    set_number: int
    reps: Optional[int] = None
    weight: Optional[float] = None
    duration: Optional[int] = None
    rest_duration: Optional[int] = None
    completed: bool = False


class ExerciseSetCreate(ExerciseSetBase):
    """Esquema para crear una nueva serie."""


# pylint: disable=too-few-public-methods
class ExerciseSetUpdate(BaseModel):
    """
    Esquema para actualizar una serie existente.

    Todos los campos son opcionales.
    """
    set_number: Optional[int] = None
    reps: Optional[int] = None
    weight: Optional[float] = None
    duration: Optional[int] = None
    rest_duration: Optional[int] = None
    completed: Optional[bool] = None


class ExerciseSet(ExerciseSetBase):
    """Esquema para representar una serie leída desde la base de datos."""
    id: int

    class Config:
        """Configuración del modelo Pydantic."""
        from_attributes = True

# pylint: disable=too-few-public-methods
class WorkoutExerciseBase(BaseModel):
    """
    Esquema base para un ejercicio dentro de una sesión de entrenamiento concreta.
    """
    exercise_id: int
    order_index: int
    notes: Optional[str] = None


class WorkoutExerciseCreate(WorkoutExerciseBase):
    """
    Esquema para añadir un ejercicio a una nueva sesión de entrenamiento.

    Incluye la lista de series (`sets`) realizadas para este ejercicio.
    """
    sets: List[ExerciseSetCreate] = []


# pylint: disable=too-few-public-methods
class WorkoutExercise(WorkoutExerciseBase):
    """
    Esquema completo para un ejercicio dentro de una sesión de entrenamiento.

    Se usa en las respuestas de la API para mostrar un ejercicio realizado,
    incluyendo sus detalles (`Exercise`), el ID de la sesión y las series.
    """
    id: int
    workout_id: int
    exercise: Exercise
    sets: List[ExerciseSet] = []

    class Config:
        """Configuración del modelo Pydantic."""
        from_attributes = True

# pylint: disable=too-few-public-methods
class WorkoutBase(BaseModel):
    """Esquema base para una sesión de entrenamiento (workout)."""
    name: Optional[str] = None
    notes: Optional[str] = None
    template_id: Optional[int] = None


class WorkoutCreate(WorkoutBase):
    """
    Esquema para crear una nueva sesión de entrenamiento.

    Incluye la lista de ejercicios que se van a realizar.
    """
    exercises: List[WorkoutExerciseCreate] = []

# pylint: disable=too-few-public-methods
class WorkoutUpdate(BaseModel):
    """
    Esquema para actualizar una sesión de entrenamiento.

    Permite modificar el nombre, las notas o marcarla como completada
    estableciendo la fecha y hora en `completed_at`.
    """
    name: Optional[str] = None
    notes: Optional[str] = None
    completed_at: Optional[datetime] = None

# pylint: disable=too-few-public-methods
class WorkoutHistory(BaseModel):
    """
    Esquema para representar una sesión de entrenamiento en el historial del usuario.

    Es una vista simplificada, ideal para listas de entrenamientos pasados.
    """
    id: int
    user_id: int
    name: Optional[str] = None
    started_at: datetime
    completed_at: Optional[datetime] = None
    notes: Optional[str] = None
    template_id: Optional[int] = None

    class Config:
        """Configuración del modelo Pydantic."""
        from_attributes = True

# pylint: disable=too-few-public-methods
class Workout(WorkoutBase):
    """
    Esquema completo para una sesión de entrenamiento.

    Representa un entrenamiento en curso o finalizado con todos sus detalles,
    incluyendo la lista completa de ejercicios y sus respectivas series.
    """
    id: int
    user_id: int
    started_at: datetime
    completed_at: Optional[datetime] = None
    workout_exercises: List[WorkoutExercise] = []

    class Config:
        """Configuración del modelo Pydantic."""
        from_attributes = True
