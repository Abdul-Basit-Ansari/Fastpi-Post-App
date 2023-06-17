import bcrypt
import sys
from sqlalchemy.orm import Session
from sqlalchemy import exc
import datetime

import db.models as models
import Schemas.schemas as schemas
import logging



def get_posts_by_user_id(db: Session, userid: int):
    try:
        return db.query(models.Post).filter(models.Post.user_id == userid).all()
    except Exception as err:
        raise err




def create_post(db:Session, post: schemas.CUPost):
    db_post = models.Post(
        user_id=post.user_id,
        text=post.text,
        created_at=datetime.datetime.now(),
    )
    try:
        db.add(db_post)
        db.commit()
        db.refresh(db_post)
        return db_post
    except Exception as err:
        raise err


def update_post(db: Session, post_id: int, post: schemas.CUPost):
    db_post = db.query(models.Post).filter(
        models.Post.id == post_id).first()
    db_post.updated_at = datetime.datetime.now()
    check_None = [None, "", "string"]
    if post.user_id not in check_None:
        db_post.user_id = post.user_id
    if post.text not in check_None:
        db_post.text = post.text
    try:
        db.add(db_post)
        db.commit()
        db.refresh(db_post)
        return db_post
    except Exception as err:
        raise err





def delete_post_by_id(db: Session, id: int):
    db.query(models.Post).filter(
        models.Post.id == id).delete()
    try:
        db.commit()
        return {id: "deleted"}
    except Exception as err:
        raise err



def get_posts(db: Session):
    try:
        return db.query(models.Post).all()
    except Exception as err:
        raise err