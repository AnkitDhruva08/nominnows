from typing import Optional, Dict
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer

from app.models.user import User
from app.models.role import Role
from app.utils.jwt_token import create_access_token, decode_access_token
from app.core.security import hash_password
from app.core.database import get_db

# OAuth2 scheme for extracting token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# -------------------------------
# 📝 User Registration Service
# -------------------------------
def register_service(payload: dict, db: Session) -> User:
    email = payload.get("email")
    mobile = payload.get("mobile")

    print('📥 Incoming registration data:', payload)

    # Check for existing email
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists"
        )

    # Check for existing mobile
    if db.query(User).filter(User.mobile == mobile).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Mobile number already exists"
        )

    try:
        new_user = User(
            user_name=payload["userName"],
            email=email,
            mobile=mobile,
            age=payload["age"],
            password=hash_password(payload["password"]),
            role_id=payload.get("role")
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error during registration: {str(exc)}"
        )

# -------------------------------
# 🔐 User Login Service
# -------------------------------
def login_service(credentials: dict, db: Session) -> Dict:
    print('📥 Incoming login data:', credentials)
    identifier = credentials.get("email")
    password = credentials.get("password")

    if not identifier or not password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing identifier or password"
        )

    user = db.query(User).filter(
        (User.email == identifier) |
        (User.mobile == identifier) |
        (User.user_name == identifier)
    ).first()

    if not user or not pwd_context.verify(password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    access_token = create_access_token(data={"sub": user.email})

    return {
        "status": 200,
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "user_name": user.user_name,
            "email": user.email,
            "role_id": user.role_id
        }
    }

# ---------------------------------------
# 🔎 Dependency: Get Authenticated User
# ---------------------------------------
def get_authenticated_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> Dict:
    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_email = payload.get("sub")
    if not user_email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token payload invalid",
        )

    # JOIN User and Role to fetch role name
    result = (
        db.query(User, Role.name.label("role_name"))
        .join(Role, User.role_id == Role.id)
        .filter(User.email == user_email)
        .first()
    )

    if not result:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    user, role_name = result

    return {
        "id": user.id,
        "user_name": user.user_name,
        "email": user.email,
        "mobile": user.mobile,
        "age": user.age,
        "role_id": user.role_id,
        "role_name": role_name
    }

# ---------------------------------------
# 📤 Public Service: Current User Profile
# ---------------------------------------
def get_user_profile(user_data: Dict) -> Dict:
    return {
        "id": user_data["id"],
        "user_name": user_data["user_name"],
        "email": user_data["email"],
        "mobile": user_data["mobile"],
        "age": user_data["age"],
        "role_id": user_data["role_id"],
        "role_name": user_data["role_name"]
    }

