import smtplib
from email.mime.text import MIMEText

from app.config import config


base_conf = config.get("base")


class MailUtil:
    @staticmethod
    def send_message(subject: str, email_to: str, body: str):
        msg = MIMEText(body)
        msg["Subject"] = subject
        msg["From"] = base_conf.MAIL_FROM
        msg["To"] = email_to

        with smtplib.SMTP(base_conf.MAIL_SERVER, base_conf.MAIL_PORT) as server:
            server.starttls()
            server.login(base_conf.MAIL_FROM, base_conf.MAIL_PASSWORD)
            server.sendmail(base_conf.MAIL_FROM, email_to, msg.as_string())
