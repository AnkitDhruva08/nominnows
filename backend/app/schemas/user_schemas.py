from pydantic import BaseModel, EmailStr, Field
from typing import Optional

# Reusable base user fields
class UserBase(BaseModel):
    user_name: str = Field(..., example="JohnDoe")
    email: EmailStr
    mobile: str
    age: Optional[int]

# Schema for creating a user
class RegisterUser(UserBase):
    password: str
    role_id: Optional[int] = Field(None, description="Optional role ID")

# Schema for reading user data (e.g., after login or get user API)
class UserResponse(UserBase):
    id: int
    role_id: Optional[int]

    class Config:
        orm_mode = True

# Optional: if you want to return role info in response
class UserWithRole(UserResponse):
    role_name: Optional[str]
