from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from Security import deps
from crud import post as crud_post
from config.api import settings
from Schemas.schemas import User , CUPost 
router = APIRouter()



@router.post("/")
async def create_new_post(post: CUPost,current_user: User = Depends(deps.get_current_active_user), db: Session = Depends(deps.get_db)):
    if post.text == "":
        raise HTTPException(
            status_code=400,
            detail="Post Must Be Not Empty")
    try:
        db_post = crud_post.create_post(db, post)
        return db_post
    except Exception as err:
            raise err


@router.patch("/{post_id}", response_model=CUPost)
async def update_user(
        post_id: str,
        post: CUPost,
        current_user: User = Depends(deps.get_current_active_user),
        db: Session = Depends(deps.get_db)):
    '''
    Update Post
    '''

    # Get organization from current user
    check_None = [None, "", "string"]
    try:
        # Push task data
        result = crud_post.update_post(db=db, post_id=post_id, post=post)
        return result
    except Exception as err:
        raise err



@router.get("/")
async def list_posts(
        current_user: User = Depends(deps.get_current_active_user),
        db: Session = Depends(deps.get_db)):
    '''
    List Posts
    '''
    try:
        return crud_post.get_posts(db=db)
    except Exception as err:
        raise err


@router.get("/{user_id}")
async def get_post_by_user(
        user_id,
        current_user: User = Depends(deps.get_current_active_user),
        db: Session = Depends(deps.get_db)):
    '''
    List user by id or name
    '''
        
    try:
        return crud_post.get_posts_by_user_id(db=db, userid=user_id)
    except Exception as err:
        raise err


@router.delete("/{post_id}")
async def delete_post(
        post_id,
        current_user: User = Depends(deps.get_current_active_user),
        db: Session = Depends(deps.get_db)):

    try:
        return crud_post.delete_post_by_id(db=db, id=post_id)
    except Exception as err:
        raise err

