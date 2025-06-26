from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.api.auth import auth as auth_routes
from app.api.role import role_router 
from app.models.role import Role

# Initialize FastAPI app
app = FastAPI(title="Backend")

# Create all database tables (only if they don’t exist)

@app.on_event("startup")
def create_tables():
    print("📦 Initializing database tables...")
    Base.metadata.create_all(bind=engine)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check route
@app.get("/")
def health_check():
    return {"message": "🚀 FastAPI backend is running"}

# Register API routers
app.include_router(auth_routes.router, prefix="/api/auth", tags=["Auth"])
app.include_router(role_router.router, prefix="/api/roles", tags=["roles"])
