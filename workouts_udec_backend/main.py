"""
Módulo principal de la API de seguimiento de entrenamientos.

Este módulo inicializa la aplicación FastAPI, configura el middleware CORS,
registra los routers de la API y define un endpoint básico de salud (`/health`)
para verificar el estado del servidor.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.main_router import api_router

app = FastAPI(
    title="Workout Tracker API",
    description="FastAPI backend for workout tracking application",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")


@app.get("/health")
def health_check() -> dict[str,str]:
    """
    Endpoint de verificación del estado del servidor.
    """
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
