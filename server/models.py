from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    pass

class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipes'
    
    pass