import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
from pathlib import Path



# Load .env from the backend root directory
env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(dotenv_path=env_path)

# Read DB credentials
DB_HOST = os.getenv("DB_HOST_1")
DB_USER = os.getenv("DB_USER_1")
DB_PASSWORD = os.getenv("DB_PASS_1")
DB_NAME = os.getenv("DB_NAME_1")
DB_PORT = os.getenv("DB_PORT_1")

# Debug print to confirm environment variables are loaded
print("🔍 Loaded environment variables:")
print(f"DB_HOST_1: {DB_HOST}")
print(f"DB_USER_1: {DB_USER}")
print(f"DB_PASS_1: {DB_PASSWORD}")
print(f"DB_NAME_1: {DB_NAME}")
print(f"DB_PORT_1: {DB_PORT}")

# Validate before using
if not all([DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT]):
    raise ValueError("❌ One or more required DB env variables are missing.")

# Build connection URL
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Create engine and session
try:
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
    connection = engine.connect()
    print("✅ Database connected successfully.")
    connection.close()
except Exception as e:
    print("❌ Failed to connect to the database.")
    print(e)

# Base model class
Base = declarative_base()

# Dependency function
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
