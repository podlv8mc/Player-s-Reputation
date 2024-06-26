from datetime import datetime
from typing import Any, Dict, Optional, List

from fastapi_users import schemas as users_schemas
from pydantic import BaseModel, ConfigDict, EmailStr

from models import Roles


def model_dump(model: BaseModel, *args, **kwargs) -> Dict[str, Any]:
    return model.model_dump(*args, **kwargs)


def model_validate(schema: BaseModel, obj: Any, *args, **kwargs) -> BaseModel:
    return schema.model_validate(obj, *args, **kwargs)


class CreateUpdateDictModel(BaseModel):
    def create_update_dict(self):
        return model_dump(
            self,
            exclude_unset=True,
            exclude={"id"},
        )

    def create_update_dict_superuser(self):
        return model_dump(self, exclude_unset=True, exclude={"id"})

    def convert_fields_to_optional(self):
        return {k: Optional[v] for k, v in self.__annotations__.items()}


# class NicknameBase(CreateUpdateDictModel):
#     room_name: Optional[str | None] = None
#     nickname: Optional[str | None] = None
#     model_config = ConfigDict(from_attributes=False)


# class NicknameCreate(NicknameBase): ...


# class NicknameRead(NicknameBase): ...


class UserFund(BaseModel):
    id: int
    name: str


class UserRead(users_schemas.BaseUser):
    id: int
    username: str
    name: Optional[str | None] = None
    role: Roles
    email: Optional[str | None] = None
    discord: Optional[str | None] = None
    created_at: datetime
    funds: Optional[List[UserFund] | None] = None


class UserReadfund(CreateUpdateDictModel):
    id: int
    username: str
    role: Roles


class UserCreate(users_schemas.BaseUserCreate):
    username: str
    name: Optional[str | None] = None
    password: str
    role: Roles
    email: Optional[str | None] = None
    discord: Optional[str | None] = None
    created_at: datetime
    funds: Optional[List[int] | None] = None


class UserUpdate(users_schemas.BaseUserUpdate):
    email: Optional[str | None] = None
    name: Optional[str | None] = None
    role: Roles
    discord: Optional[str | None] = None
    # funds: Optional[List[int] | None] = None


class FundBase(CreateUpdateDictModel):
    name: Optional[str | None] = None
    discord: Optional[str | None] = None
    link: Optional[str | None] = None
    email: Optional[str | None] = None


class FundCreate(FundBase): ...


class FundUpdate(FundBase):
    owner_id: Optional[int | None] = None


class FundRead(FundBase):
    id: int
    owner: Optional[UserReadfund | None] = None


class FundReadRecord(FundBase): ...


class RecordBase(CreateUpdateDictModel):
    first_name: Optional[str | None] = None
    last_name: Optional[str | None] = None
    middlename: Optional[str | None] = None
    room_name: Optional[str | None] = None
    gipsyteam: Optional[str | None] = None
    pokerstrategy: Optional[str | None] = None
    description: Optional[str | None] = None
    amount: Optional[str | None] = None
    google: Optional[str | None] = None
    mail: Optional[str | None] = None
    vk: Optional[str | None] = None
    facebook: Optional[str | None] = None
    blog: Optional[str | None] = None
    instagram: Optional[str | None] = None
    forum: Optional[str | None] = None
    neteller: Optional[str | None] = None
    skrill: Optional[str | None] = None
    ecopayz: Optional[str | None] = None
    webmoney_id: Optional[str | None] = None
    wallets: Optional[str | None] = None
    old: Optional[bool | None] = None
    nicknameOld: Optional[str | None] = None
    comments: Optional[str | None] = None
    country: Optional[str | None] = None
    town: Optional[str | None] = None
    address: Optional[str | None] = None
    fundName: Optional[str | None] = None

    model_config = ConfigDict(from_attributes=False)


class RecordCreate(RecordBase):
    fund_id: int


class RecordHistoryRead(BaseModel):
    id: int
    first_name: Optional[str | None] = None
    last_name: Optional[str | None] = None
    middlename: Optional[str | None] = None
    room_name: Optional[str | None] = None
    gipsyteam: Optional[str | None] = None
    pokerstrategy: Optional[str | None] = None
    description: Optional[str | None] = None
    amount: Optional[str | None] = None
    google: Optional[str | None] = None
    mail: Optional[str | None] = None
    vk: Optional[str | None] = None
    facebook: Optional[str | None] = None
    blog: Optional[str | None] = None
    instagram: Optional[str | None] = None
    forum: Optional[str | None] = None
    neteller: Optional[str | None] = None
    skrill: Optional[str | None] = None
    ecopayz: Optional[str | None] = None
    webmoney_id: Optional[str | None] = None
    wallets: Optional[str | None] = None
    old: Optional[bool | None] = None
    fund: Optional[FundReadRecord | None] = None
    nicknameOld: Optional[str | None] = None
    comments: Optional[str | None] = None
    country: Optional[str | None] = None
    town: Optional[str | None] = None
    address: Optional[str | None] = None
    model_config = ConfigDict(from_attributes=False)
    created_at: Optional[datetime | None] = None


class RecordRead(RecordBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime | None] = None
    created_by: Optional[UserRead | None] = None
    fund: Optional[FundReadRecord | None] = None
    previous_versions: Optional[List[RecordHistoryRead] | None] = None


class RecordUpdate(RecordBase): ...


class UserMail(BaseModel):
    user_choice: str
    name: str
    email: EmailStr
    subject: str
    message: str
