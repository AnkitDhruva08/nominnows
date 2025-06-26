from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.role import Role


# Create role
def create_role(role_name: str, db: Session):
    existing = db.query(Role).filter(Role.name == role_name).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role already exists"
        )
    
    role = Role(name=role_name)
    db.add(role)
    db.commit()
    db.refresh(role)
    return role


# Get role by ID
def get_role_by_id(role_id: int, db: Session):
    role = db.query(Role).filter(Role.id == role_id).first()
    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Role not found"
        )
    return role


# Get all roles
def get_all_roles(db: Session):
    return db.query(Role).all()


# Update role
def update_role(role_id: int, new_name: str, db: Session):
    role = db.query(Role).filter(Role.id == role_id).first()
    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Role not found"
        )
    
    role.name = new_name
    db.commit()
    db.refresh(role)
    return role


# Delete role
def delete_role(role_id: int, db: Session):
    role = db.query(Role).filter(Role.id == role_id).first()
    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Role not found"
        )

    db.delete(role)
    db.commit()
    return {"detail": "Role deleted successfully"}
