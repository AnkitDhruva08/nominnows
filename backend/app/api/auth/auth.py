# app/api/routes/auth.py
from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from app.core.database import get_db
from app.utils.jwt_token import decode_access_token
from app.models.user import User
from app.services.auth.auth_service import register_service, login_service,get_authenticated_user,get_user_profile

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

@router.get("/user-details")
def user_details_route(current_user: User = Depends(get_authenticated_user)):
    return get_user_profile(current_user)



@router.post("/register", status_code=201)
async def register_routes(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    user = register_service(data, db)
    return {"message": "User registered successfully", "email": user.email}


@router.post("/login", status_code=200)
async def login_routes(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    return login_service(data, db)
