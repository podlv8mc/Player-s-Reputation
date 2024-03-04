from typing import List

from pydantic import BaseModel, EmailStr


class UserMail(BaseModel):
    username: str
    phone: str
    email: EmailStr
    message: str = None