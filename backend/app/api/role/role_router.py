from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.roles.role_service import (
    create_role, get_all_roles, get_role_by_id,
    update_role, delete_role
)

router = APIRouter()


@router.post("/")
def create_role_route(request: Request, db: Session = Depends(get_db)):
    body = request.json()
    return create_role(body["name"], db)


@router.get("/")
def list_roles(db: Session = Depends(get_db)):
    return get_all_roles(db)


@router.get("/{role_id}")
def get_role(role_id: int, db: Session = Depends(get_db)):
    return get_role_by_id(role_id, db)


@router.put("/{role_id}")
def update_role_route(role_id: int, request: Request, db: Session = Depends(get_db)):
    body = request.json()
    return update_role(role_id, body["name"], db)


@router.delete("/{role_id}")
def delete_role_route(role_id: int, db: Session = Depends(get_db)):
    return delete_role(role_id, db)
