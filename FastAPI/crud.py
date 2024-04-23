from typing import List
from datetime import datetime

from sqlalchemy.orm import selectinload
from sqlalchemy import insert, select, or_
from sqlalchemy.ext.asyncio import AsyncSession

import models
import schemas
from test_data import attrss
from users import UserManager
from utils.exceptions import ObjectNotfund, Forbidden


async def get_fund_list(db: AsyncSession) -> List[models.Fund]:
    list_query = select(models.Fund).options(
        selectinload(models.Fund.managers), selectinload(models.Fund.owner)
    )
    funds_list = await db.scalars(list_query)

    return funds_list


async def get_fund_by_id(
    db: AsyncSession, fund_id: int, current_user: models.User = None
) -> models.Fund:
    fund_query = (
        select(models.Fund)
        .where(models.Fund.id == fund_id)
        .options(selectinload(models.Fund.managers), selectinload(models.Fund.owner))
    )
    fund = await db.scalar(fund_query)

    if not fund:
        raise ObjectNotfund

    if current_user.role == models.Roles.MANAGER and current_user not in fund.managers:
        raise Forbidden

    if current_user.role == models.Roles.ADMIN or (
        current_user.role == models.Roles.MANAGER and current_user in fund.managers
    ):
        return fund


async def update_fund_by_id(
    db: AsyncSession,
    fund_id: int,
    fund_new_data: schemas.FundUpdate,
    user_manager: UserManager,
    current_user: models.User = None,
) -> models.Fund:
    fund_to_update = await get_fund_by_id(
        fund_id=fund_id, db=db, current_user=current_user
    )
    update_data = fund_new_data.create_update_dict()

    try:
        owner_id = update_data.pop("owner_id")
    except:
        owner_id = None

    for key, value in update_data.items():
        setattr(fund_to_update, key, value)

    if owner_id:
        fund_to_update.owner = await user_manager.get(owner_id)

    await db.commit()
    await db.refresh(fund_to_update)

    return fund_to_update


async def create_fund(db: AsyncSession, fund_data: schemas.FundCreate) -> models.Fund:
    creation_query = insert(models.Fund).values(fund_data.model_dump())
    new_fund_result = await db.execute(creation_query)

    await db.commit()

    new_fund = await get_fund_by_id(
        db=db, fund_id=new_fund_result.inserted_primary_key[0]
    )

    return new_fund


async def delete_fund_by_id(db: AsyncSession, fund_id: int) -> None:
    fund_to_delete = await get_fund_by_id(db=db, fund_id=fund_id)

    await db.delete(fund_to_delete)
    await db.commit()

    return


async def fund_add_manager(fund_id: int, user_id: int, db: AsyncSession) -> None:
    fund = await get_fund_by_id(db=db, fund_id=fund_id)
    new_manager = await db.scalar(
        select(models.User).where(
            models.User.role.in_([models.Roles.ADMIN, models.Roles.MANAGER]),
            models.User.id == user_id,
        )
    )

    if new_manager is None:
        raise ObjectNotfund()
    try:
        fund.managers.append(new_manager)
        await db.commit()

    except Exception as e:
        await db.rollback()
        raise e


async def get_records_list(
    db: AsyncSession, search_query: str, fund_id: int
) -> List[models.Record]:
    records_query = (
        select(models.Record)
        .options(
            selectinload(models.Record.previous_versions),
            selectinload(models.Record.created_by),
            selectinload(models.Record.fund),
        )
        .order_by(models.Record.created_at.desc())
    )

    if fund_id:
        records_query = records_query.where(models.Record.fund_id == fund_id)

    if search_query:
        records_query = records_query.where(
            or_(
                models.Record.description.ilike(f"%{search_query}%"),
                models.Record.first_name.ilike(f"%{search_query}%"),
                models.Record.last_name.ilike(f"%{search_query}%"),
                models.Record.middlename.ilike(f"%{search_query}%"),
                models.Record.description.ilike(f"%{search_query}%"),
            )
        )

    records = await db.scalars(records_query)
    return records


async def get_record_by_id(db: AsyncSession, record_id: int) -> models.Record:
    record_by_id_query = (
        select(models.Record)
        .where(models.Record.id == record_id)
        .options(
            selectinload(models.Record.previous_versions),
            selectinload(models.Record.created_by),
            selectinload(models.Record.fund),
        )
    )
    record = await db.scalar(record_by_id_query)

    if record is None:
        raise ObjectNotfund

    return record


async def create_record(
    db: AsyncSession, record_data: schemas.RecordCreate, current_user: models.User
):
    record_data = record_data.create_update_dict()
    fund = await get_fund_by_id(
        db=db, fund_id=record_data.pop("fund_id"), current_user=current_user
    )
    create_record_query = insert(models.Record).values(record_data)

    try:
        created_record_data = await db.execute(create_record_query)

        await db.commit()

        new_record = await get_record_by_id(
            record_id=created_record_data.inserted_primary_key[0], db=db
        )
        new_record.fund = fund

        await db.commit()
        await db.refresh(new_record)

        return new_record

    except Exception as e:
        await db.rollback()
        raise (e)


async def update_record_by_id(
    db: AsyncSession, record_id: int, new_data: schemas.RecordCreate
) -> models.Record:
    previous_version = models.RecordHistory()
    record = await get_record_by_id(record_id=record_id, db=db)

    for attr in attrss:
        setattr(previous_version, attr, getattr(record, attr))

    db.add(previous_version)

    update_data = new_data.create_update_dict()
    update_data["updated_at"] = datetime.now()

    for key, value in update_data.items():
        setattr(record, key, value)

    record.previous_versions.append(previous_version)

    await db.commit()

    return record


async def delete_record_by_id(db: AsyncSession, record_id: int) -> None:
    record_to_delete = await get_record_by_id(db=db, record_id=record_id)

    await db.delete(record_to_delete)
    await db.commit()
