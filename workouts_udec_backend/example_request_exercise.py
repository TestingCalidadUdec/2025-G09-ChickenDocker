#!/usr/bin/env python3
"""
Script de prueba para la API de ejercicios.

Este módulo contiene funciones para probar la creación de ejercicios en la API.
Se encarga de dos tareas principales:
1. Obtener un token de autenticación para un usuario administrador.
2. Utilizar ese token para enviar una petición POST y crear un nuevo ejercicio.
"""
import json
import requests


# Get admin token
def get_admin_token():
    """
    Autentica al usuario administrador y obtiene un token de acceso.
    """
    response = requests.post(
        "http://localhost:8000/api/auth/login",
        data={"username": "admin@example.com", "password": "admin123"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        timeout=10,
    )
    if response.status_code == 200:
        return response.json()["access_token"]
    print(f"Login failed: {response.status_code} - {response.text}")
    return None


# Test exercise creation
def test_exercise_creation() -> None:
    """
    Prueba la creación de un nuevo ejercicio a través de la API.
    """
    token = get_admin_token()
    if not token:
        return

    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    exercise_data = {
        "name": "Test Exercise",
        "description": "Test description",
        "exercise_type": "WEIGHT_BASED",
        "muscle_group": "Chest",
        "equipment": "Barbell",
        "instructions": "Test instructions",
    }

    print("Sending exercise data:")
    print(json.dumps(exercise_data, indent=2))

    response = requests.post(
        "http://localhost:8000/api/exercises/",
        headers=headers,
        json=exercise_data,
        timeout=10,
    )

    print(f"\nResponse Status: {response.status_code}")
    print(f"Response Body: {response.text}")

    if response.status_code == 422:
        try:
            error_detail = response.json()
            print("\nValidation Errors:")
            print(json.dumps(error_detail, indent=2))
        except json.JSONDecodeError:
            pass


if __name__ == "__main__":
    test_exercise_creation()
