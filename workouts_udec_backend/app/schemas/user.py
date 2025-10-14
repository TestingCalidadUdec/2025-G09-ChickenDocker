"""
Módulo que define los esquemas (schemas) de Pydantic para la entidad User y la autenticación.

Estos esquemas se utilizan para la validación de datos, serialización y documentación
de la API para operaciones relacionadas con usuarios y tokens de autenticación (JWT).
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


# pylint: disable=too-few-public-methods
class UserBase(BaseModel):
    """
    Esquema base para un usuario.

    Contiene los campos comunes que se comparten entre los diferentes esquemas de usuario.
    La mayoría de los campos son opcionales para proporcionar flexibilidad.
    """

    email: Optional[EmailStr] = None
    username: Optional[str] = None
    full_name: Optional[str] = None
    is_active: Optional[bool] = True
    is_admin: Optional[bool] = False


class UserCreate(UserBase):
    """
    Esquema para la creación de un nuevo usuario.

    Hereda de `UserBase` pero hace que `email`, `username` y `password` sean campos
    obligatorios para asegurar que se proporcionen los datos mínimos necesarios
    al registrar un nuevo usuario.
    """

    email: EmailStr
    username: str
    password: str


class UserUpdate(UserBase):
    """
    Esquema para actualizar un usuario existente.

    Hereda de `UserBase` y añade un campo opcional para la contraseña.
    Permite actualizaciones parciales, ya que todos los campos son opcionales.
    """

    password: Optional[str] = None


class UserInDBBase(UserBase):
    """
    Esquema base para un usuario tal como se representa en la base de datos.

    Añade campos gestionados automáticamente por la base de datos, como el `id`
    y las marcas de tiempo (`created_at`, `updated_at`).
    """

    id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        """
        Configuración del modelo Pydantic.

        from_attributes = True: Permite crear el modelo Pydantic a partir
        de un objeto ORM, leyendo los datos desde sus atributos.
        """

        from_attributes = True


class User(UserInDBBase):
    """
    Esquema para representar un usuario en las respuestas de la API.

    Este modelo se utiliza para devolver datos de usuario al cliente, excluyendo
    información sensible como la contraseña.
    """


class UserInDB(UserInDBBase):
    """
    Esquema que representa la estructura completa de un usuario en la base de datos.

    Incluye el campo `hashed_password` para manejar internamente la contraseña
    almacenada de forma segura. No debe ser expuesto en las respuestas de la API.
    """

    hashed_password: str


class Token(BaseModel):
    """
    Esquema para el token de acceso JWT.

    Representa la respuesta que se envía al cliente tras una autenticación exitosa.
    """

    access_token: str
    token_type: str


class TokenPayload(BaseModel):
    """
    Esquema para el contenido (payload) del token JWT.

    Define la estructura de los datos codificados dentro del token. El campo `sub`
    (subject) se usa comúnmente para almacenar el identificador del usuario.
    """

    sub: Optional[int] = None
