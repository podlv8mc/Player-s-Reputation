from fastapi import APIRouter
from starlette.responses import JSONResponse

import app.schema as s
from app.config import config
from app.utils import MailUtil


base_conf = config.get("base")
dev_conf = config.get("dev")
user_router = APIRouter(prefix="/user", tags=["Users"])


@user_router.post("/send_email/")
async def send_email(data: s.UserMail) -> JSONResponse:
    mu = MailUtil()
    u_data = data.dict()

    mu.send_message(
        "Test subject",
        base_conf.MAIL_FROM,
        dev_conf.text.format(
            u_data.get("username"),
            u_data.get("phone"),
            u_data.get("email"),
            u_data.get("message") or "-",
        ),
    )

    return JSONResponse(
        status_code=200,
        content={
            "message": "Email has been sent",
        },
    )
