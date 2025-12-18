from passlib.context import CryptContext
from sqlalchemy.orm import Session
from .models import User

pwd_context = CryptContext(schemes=["bcrypt"])

class AuthService:
    def hash_password(self,password:str):
        return pwd_context.hash(password)
    def verify_password(self,plain,hashed):
        return pwd_context.verify(plain,hashed)
    def create_user(self, db:Session, email:str, password:str):
        user = User(email=email, password=self.hash_password(password))
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    
    def authenticate(self, db:Session,email:str,password:str):
        user = db.query(User).filter(User.email==email)
        if not user:
            return None
        if not self.verify_password(password,user.password):
            return None
        return user