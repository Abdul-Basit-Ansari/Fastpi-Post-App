from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from config.database import Base
import datetime


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    fullname = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.now())
    updated_at = Column(DateTime)



class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    text = Column(String(500), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.now())
    updated_at = Column(DateTime)
