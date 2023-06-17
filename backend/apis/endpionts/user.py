from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from Security import deps
from crud import user as crud_users
from config.api import settings
from Schemas.schemas import User , UserInit , UserRegister 
from Schemas.schemas import UpdateUser ,PasswordReset
router = APIRouter()


@router.post("/start")
async def create_init_user(user: UserInit, db: Session = Depends(deps.get_db)):
    '''
    Create init user
    '''
    deps.validate_password(user.password)
    init_user = settings.INIT_USER
    db_user = crud_users.get_user_by_username(
        db, username=init_user.get("username"))
    if db_user:
        raise HTTPException(
            status_code=409,
            detail="Username already registered")
    else:
        try:
            return crud_users.create_init_user(db=db, password=user.password)
        except Exception as err:
            raise err









@router.post("/user")
async def user_registration(user: UserRegister, db: Session = Depends(deps.get_db)):
    # Check if company exist
    check_user = crud_users.get_user_by_username(db, user.username)
    check_mail = crud_users.get_user_by_email(db, user.email)
    if check_user:
        raise HTTPException(
            status_code=409,
            detail="The Username already exist")
    if check_mail:
        raise HTTPException(
            status_code=409,
            detail="The email already exist")
    try:
        db_user = crud_users.register_user(db, user)
        return db_user
    except Exception as err:
            raise err

@router.get("/is_available/{username}")
async def is_available(
    username:str,
    db: Session = Depends(deps.get_db)):
        result = crud_users.get_user_by_username(db,username)
        if result is not None:
            raise HTTPException(status_code=409,detail= f"Username {username} is already exist")
        return True




@router.patch("/{user_id}", response_model=UpdateUser)
async def update_user(
        user_id: str,
        user: UpdateUser,
        current_user: User = Depends(deps.get_current_active_user),
        db: Session = Depends(deps.get_db)):
    '''
    Update user
    '''

    # Get organization from current user
    check_None = [None, "", "string"]
    if user.password not in check_None:
        deps.validate_password(user.password)
    try:
        # Push task data
        result = crud_users.update_user(db=db, user_id=user_id, user=user)
        return result
    except Exception as err:
        raise err


@router.patch("/reset/")
async def password_reset(
        passwd: PasswordReset,
        current_user: User = Depends(deps.get_current_active_user),
        db: Session = Depends(deps.get_db)):
    '''
    reset user
    '''
    user_id = current_user.id
    deps.validate_password(passwd.passwd)
    try:
        result = crud_users.password_reset(
            db=db, user_id=user_id, password=passwd)
        return {"result": "Password updated"}
    except Exception as err:
        raise err


@router.get("/")
async def list_users(
        current_user: User = Depends(deps.get_current_active_user),
        db: Session = Depends(deps.get_db)):
    '''
    List users
    '''
    try:
        return crud_users.get_users(db=db)
    except Exception as err:
        raise err


@router.get("/{user}")
async def list_user_by_id_or_name(
        user,
        current_user: User = Depends(deps.get_current_active_user),
        db: Session = Depends(deps.get_db)):
    '''
    List user by id or name
    '''
        
    try:
        if not user.isdigit():
            return crud_users.get_user_by_username(db=db, username=user)
        return crud_users.get_user_by_id(db=db, id=user)
    except Exception as err:
        raise err


@router.delete("/{user}")
async def delete_user_by_id_or_username(
        user,
        current_user: User = Depends(deps.get_current_active_user),
        db: Session = Depends(deps.get_db)):
    try:
        if not user.isdigit():
            return crud_users.delete_user_by_name(db=db, username=user)
        return crud_users.delete_user_by_id(db=db, id=user)
    except Exception as err:
        raise err

