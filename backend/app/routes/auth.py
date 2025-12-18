from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..schemas import UserCreate,UserLogin
from ..auth import AuthService

router  = APIRouter(prefix="/auth")
auth_service  = AuthService()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup")
def signup(data:UserCreate, db:Session = Depends(get_db)):
    return auth_service.create_user(db,data.email,data.password)

@router.post("/login")
def login(data:UserLogin, db:Session=Depends(get_db)):
    user = auth_service.authenticate(db,data.email,data.password)
    if not user:
        raise HTTPException(status_code=401, detail="invalid credentials")
    return {"message": "login successfull"}


