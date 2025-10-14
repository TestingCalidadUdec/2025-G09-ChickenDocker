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
def health_check() -> dict[str,str]:  # Endpoint para que Docker para chequear si el backend está vivo
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
