from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt




################################  USER  #####################################
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-_password_hash',)

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    phone = db.Column(db.Integer)
    _password_hash = db.Column(db.String)
    dob = db.Column(db.DateTime, nullable=False)
    lot = db.Column(db.String, nullable=False)
    street = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zip = db.Column(db.String, nullable=False)
    photo_id = db.Column(db.String, unique=True, nullable=False)
    image_url = db.Column(db.String)
    bio = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


    def serialize(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'phone': self.phone,
            '_password_hash': self._password_hash,
            'dob': self.dob.strftime('%Y-%m-%d'), # Format to YYYY-MM-DD
            'lot': self.lot,
            'street': self.street,
            'city': self.city,
            'state': self.state,
            'zip': self.zip,
            'photo_id': self.photo_id,
            'image_url': self.image_url,
            'bio': self.bio,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'), # Format to YYYY-MM-DD HH:MM:SS
            'updated_at': self.updated_at.strftime('%Y-%m-%d %H:%M:%S'), # Format to YYYY-MM-DD HH:MM:SS
}

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}>'

################################  LESSOR  ####################################
class Lessor (db.Model, SerializerMixin):
    __tablename__ = 'lessors'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


    #relationships
    user = db.relationship('User', backref='lessors')

    def __repr__(self):
        return f'<Lessor {self.id}: {self.name}>'


################################  LESSEE  ####################################
class Lessee (db.Model, SerializerMixin):
    __tablename__ = 'lessees'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    #relationships
    unit_applications = db.relationship('UnitApplication', backref='lessee', lazy='joined')
    units = association_proxy('unit_applications', 'unit')
    serialize_rules = ("-unit_applications.lessee",)
    

    def __repr__(self):
        return f'<Lessee {self.id}: {self.name}>'
    
################################  UNIT  #####################################
class Unit (db.Model, SerializerMixin):
    __tablename__ = 'units'
    id = db.Column(db.Integer, primary_key=True)
    lessor_id = db.Column(db.Integer(), db.ForeignKey('lessors.id'))

    name = db.Column(db.String, nullable=True)
    image_url = db.Column(db.String, nullable=True)
    type = db.Column(db.String, nullable=True)
    unit_num = db.Column(db.String, nullable=True)
    lot = db.Column(db.String, nullable=True)
    street = db.Column(db.String, nullable=True)
    city = db.Column(db.String, nullable=True)
    state = db.Column(db.String, nullable=True)
    zip = db.Column(db.String, nullable=True)
    beds = db.Column(db.Integer, nullable=True)
    baths = db.Column(db.Integer, nullable=True)
    sqft = db.Column(db.Integer, nullable=True)
    price = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    #relationships
    # lessor = db.relationship('Lessor', backref='units', lazy='joined')
    unit_applications = db.relationship('UnitApplication', backref='unit', lazy='joined')
    lessees = association_proxy('unit_applications', 'lessee')
    serialize_rules = ("-unit_applications.unit",)

    def __repr__(self):
        return f'<Unit {self.id}: {self.name}>'
    
    def serialize(self):
        # if isinstance(self.lessor, Lessor):
        #     lessor = self.lessor.serialize()
        # else:
            # lessor = {'id' : self.lessor_id}
        data = {
            'id': self.id,
            'lessor_id': self.lessor_id,
            'image_url': self.image_url,
            'type': self.type,
            # 'lessor': lessor,
            'name': self.name,
            'unit_num': self.unit_num,
            'lot': self.lot,
            'street': self.street,
            'city': self.city,
            'state': self.state,
            'zip': self.zip,
            'beds': self.beds,
            'baths': self.baths,
            'sqft': self.sqft,
            'price': self.price,
            'created_at': self.created_at.isoformat(),
        }
        if self.updated_at is not None:
            data['updated_at'] = self.updated_at.isoformat()
        return data
    
################################  APPLICATION  #####################################

class UnitApplication (db.Model, SerializerMixin):
    __tablename__ = 'unit_applications'
    id = db.Column(db.Integer, primary_key=True)
    lessee_id = db.Column(db.Integer(), db.ForeignKey('lessees.id'))
    unit_id = db.Column(db.Integer(), db.ForeignKey('units.id'))
    status = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # unit = db.relationship('Unit', backref='unit_applications')

    def serialize(self):
        if self.unit is not None:
            unit_data = self.unit.serialize()
        else:
            unit_data = {'error': 'Unit not found'}

        data = {
            'id': self.id,
            'lessee_id': self.lessee_id,
            'unit_id': self.unit_id,
            'unit': unit_data,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
        }
        if self.updated_at:
            data['updated_at'] = self.updated_at.isoformat()
        return data


    def __repr__(self):
        return f'<UnitApplication {self.id}: {self.name}>'


################################  LEASE  #####################################
class Lease (db.Model, SerializerMixin):
    __tablename__ = 'leases'
    id = db.Column(db.Integer, primary_key=True)
    lessor_id = db.Column(db.Integer(), db.ForeignKey('lessors.id'))
    lessee_id = db.Column(db.Integer(), db.ForeignKey('lessees.id'))
    unit_id = db.Column(db.Integer(), db.ForeignKey('units.id'))
    rent = db.Column(db.Integer, nullable=True)
    sec_deposit = db.Column(db.Integer, nullable=True)
    beds = db.Column(db.Integer, nullable=True)
    baths = db.Column(db.Integer, nullable=True)
    sqft = db.Column(db.Integer, nullable=True)
    type = db.Column(db.String, nullable=True)
    util_incld = db.Column(db.Boolean, nullable=True)
    util_excld = db.Column(db.String, nullable=True)
    lot = db.Column(db.String, nullable=True)
    street = db.Column(db.String, nullable=True)
    unit_num = db.Column(db.String, nullable=True)
    city = db.Column(db.String, nullable=True)
    state = db.Column(db.String, nullable=True)
    zip = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def __repr__(self):
        return f'<Lease {self.id}: {self.name}>'

################################  RECIPE  #####################################
# class Recipe(db.Model, SerializerMixin):
#     __tablename__ = 'recipes'
#     __table_args__ = (
#         db.CheckConstraint('length(instructions) >= 50'),
#     )

#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String, nullable=False)
#     instructions = db.Column(db.String, nullable=False)
#     minutes_to_complete = db.Column(db.Integer)

#     user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))

#     def __repr__(self):
#         return f'<Recipe {self.id}: {self.title}>'
    
