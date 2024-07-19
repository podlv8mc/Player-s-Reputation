import json
from datetime import datetime

from sqlalchemy import select
from sqlalchemy.orm import selectinload

import models
import engine


def add_funds():
    with open("./databases/userprops.nosql", "r", encoding="UTF-8") as funds_json:
        records_list = funds_json.readlines()


    with engine.sync_session() as db:
        user_props = {}
        for record in records_list[:-1]:
            try:
                record_dict = json.loads(record)
            except json.JSONDecodeError as e:
                print(e)
                break
            user_id = record_dict.pop("id", None)
            funds = record_dict.pop("funds", None)
            fund_id = None
            print(funds)
            if funds:
                fund_id = list(funds.keys())[0]
            if user_id is not None and fund_id is not None:
                user_props[user_id] = fund_id

        for record in db.scalars(select(models.Record).options(selectinload(models.Record.created_by))).all():
            user_id = record.created_by.old_id
            fund = db.scalar(select(models.Fund).where(models.Fund.old_id == user_props.get(user_id)))
            record.fund = fund
            db.commit()


if __name__ == "__main__":
    add_funds()