from sqlalchemy import create_engine, Column, Integer, String, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from datetime import datetime

# Database URL from environment or use SQLite for local development
DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "sqlite:///./sunshine_aura_ai.db"
)

# Handle PostgreSQL URL format from Render
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg2://", 1)

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    mobile = Column(String(20), nullable=True)
    role = Column(String(20), default="free", nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)


class CallbackRequest(Base):
    __tablename__ = "callback_requests"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    mobile = Column(String(20), nullable=False)
    course = Column(String(255), nullable=False)
    location = Column(String(255), nullable=True)
    message = Column(String(1000), nullable=True)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)


# Create tables
Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
