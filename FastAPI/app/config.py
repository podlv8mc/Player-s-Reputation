import os

from dotenv import load_dotenv


load_dotenv(".env")


class BaseConfig:
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_FROM = os.getenv("MAIL_FROM")
    MAIL_PORT = int(os.getenv("MAIL_PORT"))
    MAIL_SERVER = os.getenv("MAIL_SERVER")


class DevelopmentConfig:
    text = """
Name: {0}
Phone: {1}
E-mail: {2}
Message: {3}
"""


config = dict(base=BaseConfig, dev=DevelopmentConfig)
