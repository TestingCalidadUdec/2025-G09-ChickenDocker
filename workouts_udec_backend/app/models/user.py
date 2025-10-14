"""
Este módulo define el modelo de la base de datos para los usuarios.

Utiliza SQLAlchemy para declarar la estructura de la tabla 'users',
incluyendo sus columnas, tipos de datos y relaciones.
"""
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.db.base_class import Base

# pylint: disable=too-few-public-methods
class User(Base):
    """
    Representa un usuario en la aplicación.

    Este modelo almacena toda la información relacionada con la cuenta de un usuario,
    incluyendo credenciales para autenticación, detalles personales y marcadores
    de estado para el control de acceso.
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now)
