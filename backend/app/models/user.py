from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    mobile = Column(String, unique=True)
    age = Column(Integer)
    password = Column(String, nullable=False)

    role_id = Column(Integer, ForeignKey("roles.id"))
    role = relationship("Role")