from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import get_db

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    print("✅ FastAPI is starting up...")

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI backend"}
