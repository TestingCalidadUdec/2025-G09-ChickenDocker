from app.db.session import SessionLocal
from app.db.base_class import Base

# IMPORTA TODOS LOS MODELOS
from app.models.user import User
from app.models.exercise import Exercise
from app.models.workout import (
    Workout,
    WorkoutExercise,
    ExerciseSet,
    WorkoutTemplate,
    WorkoutTemplateExercise,
)

def reset_database():
    db = SessionLocal()
    # Elimina todas las tablas
    Base.metadata.drop_all(bind=db.get_bind())
    # Crea todas las tablas de nuevo
    Base.metadata.create_all(bind=db.get_bind())
    db.close()
    print("Base de datos reiniciada.")

if __name__ == "__main__":
    reset_database()