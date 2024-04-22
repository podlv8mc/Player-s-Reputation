import json
from datetime import datetime

from sqlalchemy import select

import models
import engine


def migrate_records():
    with open("databases/arbitrages.nosql", "r", encoding="UTF-8") as arb_json:
        records_list = arb_json.readlines()

    with engine.sync_session() as db:
        for record in records_list[:10]:
            try:
                record_dict = json.loads(record)

            except json.JSONDecodeError as e:
                print(record[: e.colno + 3])
                break

            print(record)

            new_arb = models.Record()

            case = record_dict.pop("case")[0]
            record_dict["description"] = case.get("descr")
            record_dict["amount"] = case.get("amount")
            initials = record_dict.pop("FIO")

            if initials:
                initials = initials[0]
                new_arb.first_name = initials.get("firstname")
                new_arb.last_name = initials.get("lastname")
                new_arb.middlename = initials.get("middlename")

            fundname = record_dict.pop("fundName")
            fund = db.scalar(select(models.Fund).where(models.Fund.name == fundname))

            new_arb.old_id = record_dict.pop("id")
            new_arb.fund = fund
            room_name = record_dict.pop("nickname")

            if room_name:
                print(room_name)
                new_arb.room_name = room_name[0].get("discipline")

            webmoney = record_dict.pop("webmoney")

            if webmoney:
                webmoney = webmoney[0]
                new_arb.webmoney_id = webmoney.get("WMID")

                if webmoney.get("wallets"):
                    new_arb.wallets = " ".join(webmoney.get("wallets"))
                else:
                    new_arb.wallets = None

            location = record_dict.pop("location")

            if location:
                location = location[0]
                new_arb.country = location.get("country")
                new_arb.town = location.get("town")
                new_arb.address = location.get("address")

            new_arb.created_at = datetime.strptime(
                record_dict.pop("created"), "%Y-%m-%dT%H:%M:%S.%fZ"
            )
            new_arb.updated_at = datetime.strptime(
                record_dict.pop("updated"), "%Y-%m-%dT%H:%M:%S.%fZ"
            )
            created_by = db.scalar(
                select(models.User).where(
                    models.User.old_id == record_dict.pop("author")
                )
            )

            if created_by:
                new_arb.created_by_id = created_by.id

            for key, value in record_dict.items():
                if value is None:
                    setattr(new_arb, key, None)

                if value and isinstance(value, list):
                    if value[0]:
                        setattr(new_arb, key, value[0])
                        continue

                if value and isinstance(value, str):
                    setattr(new_arb, key, value)

            db.add(new_arb)
            db.commit()


migrate_records()
