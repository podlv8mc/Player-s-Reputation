from typing import List
from datetime import datetime
from enum import Enum as PythonEnum

from sqlalchemy import (
    ForeignKey,
    String,
    Integer,
    Table,
    Column,
    Enum,
    DateTime,
    Text,
    Boolean,
)
from fastapi_users.db import SQLAlchemyBaseUserTable
from sqlalchemy.orm import mapped_column, Mapped, relationship

from db.engine import Base


class Roles(PythonEnum):
    ADMIN = "admin"
    MANAGER = "manager"
    USER = "user"
    READ_ONLY = "read_only"


users_in_funds = Table(
    "users_funds",
    Base.metadata,
    Column("user_id", ForeignKey("users.id"), primary_key=True),
    Column("funds_id", ForeignKey("funds.id"), primary_key=True),
)

managers_in_funds = Table(
    "managers_funds",
    Base.metadata,
    Column("manager_id", ForeignKey("users.id"), primary_key=True),
    Column("funds_id", ForeignKey("funds.id"), primary_key=True),
)


class User(SQLAlchemyBaseUserTable[int], Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer(), primary_key=True, index=True)
    login: Mapped[str] = mapped_column(String(64), nullable=True)
    username: Mapped[str] = mapped_column(String(64), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(256), server_default="-", nullable=True)
    discord: Mapped[str] = mapped_column(String(256), server_default="-", nullable=True)
    role: Mapped[str] = mapped_column(Enum(Roles))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default="now()"
    )
    funds: Mapped[List["Fund"]] = relationship(
        secondary=users_in_funds, back_populates="users"
    )
    managed_funds: Mapped[List["Fund"]] = relationship(
        secondary=managers_in_funds, back_populates="managers"
    )
    old_id: Mapped[str] = mapped_column(String(), nullable=True)


class Fund(Base):
    __tablename__ = "funds"
    id: Mapped[int] = mapped_column(Integer(), primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(), nullable=False)
    email: Mapped[str] = mapped_column(String(), server_default="-", nullable=True)
    discord: Mapped[str] = mapped_column(String(), server_default="-", nullable=True)
    link: Mapped[str] = mapped_column(String(), server_default="-", nullable=True)
    users: Mapped[List["User"]] = relationship(
        secondary=users_in_funds, back_populates="funds"
    )
    managers: Mapped[List["User"]] = relationship(
        secondary=managers_in_funds, back_populates="managed_funds"
    )
    owner: Mapped[User] = relationship()
    owner_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=True)
    records: Mapped[List["Record"]] = relationship()
    records_history: Mapped[List["RecordHistory"]] = relationship()
    old_id: Mapped[str] = mapped_column(String(), server_default="-", nullable=True)


class Nickname(Base):
    __tablename__ = "nicknames"
    id = Column(Integer, primary_key=True)
    room_name = Column(String(64), nullable=True)
    nickname = Column(String(64), nullable=True)
    record_id = Column(Integer, ForeignKey("records.id"), nullable=True)
    record = relationship("Record", back_populates="nicknames")
    history_record_id = Column(Integer, ForeignKey("records_history.id"), nullable=True)
    record_history = relationship("RecordHistory", back_populates="nicknames")


class Record(Base):
    __tablename__ = "records"
    id = Column(Integer, primary_key=True)
    first_name = Column(String(64), server_default="-", nullable=True)
    last_name = Column(String(64), server_default="-", nullable=True)
    middlename = Column(String(64), server_default="-", nullable=True)
    nicknames = relationship("Nickname", back_populates="record")
    gipsyteam = Column(Text(), server_default="-", nullable=True)
    pokerstrategy = Column(Text(), server_default="-", nullable=True)
    description = Column(Text(), server_default="-", nullable=True)
    amount = Column(Text(), server_default="-", nullable=True)
    google = Column(Text(), server_default="-", nullable=True)
    mail = Column(Text(), server_default="-", nullable=True)
    vk = Column(Text(), server_default="-", nullable=True)
    facebook = Column(Text(), server_default="-", nullable=True)
    blog = Column(Text(), server_default="-", nullable=True)
    instagram = Column(Text(), server_default="-", nullable=True)
    forum = Column(Text(), server_default="-", nullable=True)
    neteller = Column(Text(), server_default="-", nullable=True)
    skrill = Column(Text(), server_default="-", nullable=True)
    ecopayz = Column(Text(), server_default="-", nullable=True)
    old = Column(Boolean(), default=False)
    fundName = Column(Text(), server_default="-", nullable=True)
    fund = relationship(Fund, back_populates="records")
    fund_id = Column(Integer, ForeignKey("funds.id"))
    nicknameOld = Column(Text(), server_default="-", nullable=True)
    comments = Column(Text(), server_default="-", nullable=True)
    country = Column(Text(), server_default="-", nullable=True)
    town = Column(Text(), server_default="-", nullable=True)
    address = Column(Text(), server_default="-", nullable=True)
    created_by_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_by = relationship("User")
    created_at = Column(DateTime(timezone=True))
    webmoney_id = Column(Text(), server_default="-", nullable=True)
    wallets = Column(Text(), server_default="-", nullable=True)
    updated_at = Column(DateTime(timezone=True), nullable=True)
    previous_versions = relationship("RecordHistory", back_populates="current_version")

    old_id = Column(String(), nullable=True)


class RecordHistory(Base):
    __tablename__ = "records_history"
    id = Column(Integer, primary_key=True)
    first_name = Column(String(64), server_default="-", nullable=True)
    last_name = Column(String(64), server_default="-", nullable=True)
    middlename = Column(String(64), server_default="-", nullable=True)
    nicknames = relationship("Nickname", back_populates="record_history")
    gipsyteam = Column(Text(), server_default="-", nullable=True)
    pokerstrategy = Column(Text(), server_default="-", nullable=True)
    description = Column(Text(), server_default="-", nullable=True)
    amount = Column(Text(), server_default="-", nullable=True)
    google = Column(Text(), server_default="-", nullable=True)
    mail = Column(Text(), server_default="-", nullable=True)
    vk = Column(Text(), server_default="-", nullable=True)
    facebook = Column(Text(), server_default="-", nullable=True)
    blog = Column(Text(), server_default="-", nullable=True)
    instagram = Column(Text(), server_default="-", nullable=True)
    forum = Column(Text(), server_default="-", nullable=True)
    neteller = Column(Text(), server_default="-", nullable=True)
    skrill = Column(Text(), server_default="-", nullable=True)
    ecopayz = Column(Text(), server_default="-", nullable=True)
    old = Column(Boolean(), default=False)
    fundName = Column(Text(), server_default="-", nullable=True)
    fund = relationship(Fund, back_populates="records_history")
    fund_id = Column(Integer, ForeignKey("funds.id"))
    nicknameOld = Column(Text(), server_default="-", nullable=True)
    comments = Column(Text(), server_default="-", nullable=True)
    country = Column(Text(), server_default="-", nullable=True)
    town = Column(Text(), server_default="-", nullable=True)
    address = Column(Text(), server_default="-", nullable=True)
    created_at = Column(DateTime(timezone=True))
    webmoney_id = Column(Text(), server_default="-", nullable=True)
    wallets = Column(Text(), server_default="-", nullable=True)
    updated_at = Column(DateTime(timezone=True), nullable=True)
    current_version_id = Column(Integer, ForeignKey("records.id"))
    current_version = relationship("Record", back_populates="previous_versions")
    old_id = Column(String(), server_default="-", nullable=True)
