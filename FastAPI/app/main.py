from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.router import user_router


app = FastAPI()

# Configuring CORS to allow requests from React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)