#!/usr/bin/env python3
from datetime import datetime
from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Recipe

date_str = '1995-05-23'

class Signup(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        first_name = request_json.get("first_name")
        last_name = request_json.get("last_name")
        email = request_json.get("email")
        phone = request_json.get("phone")
        password = request_json.get('password')
        dob = request_json.get("dob")
        lot = request_json.get("lot")
        street = request_json.get("street")
        city = request_json.get("city")
        state = request_json.get("state")
        zip = request_json.get("zip")
        photo_id = request_json.get("photo_id")
        image_url = request_json.get('image_url')
        bio = request_json.get('bio')
        created_at = datetime.now()
        updated_at = datetime.now()




        user = User(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone,
            dob=datetime.strptime(dob, '%Y-%m-%d'),
            lot=lot,
            street=street,
            city=city,
            state=state,
            zip=zip,
            photo_id=photo_id,
            image_url=image_url,
            bio=bio,
            created_at=created_at,
            updated_at=updated_at
)
        

        # the setter will encrypt this
        user.password_hash = password

        print('first')

        try:

            print('here!')

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            print(user.to_dict())

            return user.to_dict(), 201

        except IntegrityError:

            print('no, here!')
            
            return {'error': '422 Unprocessable Entity'}, 422

class CheckSession(Resource):
    
    def get(self):

        if session.get('user_id'):

            user = User.query.filter(User.id == session['user_id']).first()

            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

class Login(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

class Logout(Resource):
    
    def delete(self):
        
        if session.get('user_id'):
            
            session['user_id'] = None
            
            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401

##################### units #####################

# Create a new unit
@app.route('/units', methods=['POST'])
def create_unit():
    data = request.get_json()
    unit = Unit(**data)
    db.session.add(unit)
    db.session.commit()
    return jsonify(unit.serialize()), 201

# Get all units
@app.route('/units', methods=['GET'])
def get_units():
    units = Unit.query.all()
    return jsonify([unit.serialize() for unit in units]), 200

# Get a specific unit
@app.route('/units/<int:id>', methods=['GET'])
def get_unit(id):
    unit = Unit.query.get(id)
    if unit is None:
        return jsonify({'error': 'Unit not found'}), 404
    return jsonify(unit.serialize()), 200

# Update a unit
@app.route('/units/<int:id>', methods=['PUT'])
def update_unit(id):
    data = request.get_json()
    unit = Unit.query.get(id)
    if unit is None:
        return jsonify({'error': 'Unit not found'}), 404
    for key, value in data.items():
        setattr(unit, key, value)
    db.session.commit()
    return jsonify(unit.serialize()), 200

# Delete a unit
@app.route('/units/<int:id>', methods=['DELETE'])
def delete_unit(id):
    unit = Unit.query.get(id)
    if unit is None:
        return jsonify({'error': 'Unit not found'}), 404
    db.session.delete(unit)
    db.session.commit()
    return jsonify({'message': 'Unit deleted successfully'}), 200




#################### RecipeIndex ####################
class RecipeIndex(Resource):

    def get(self):

        if session.get('user_id'):

            user = User.query.filter(User.id == session['user_id']).first()

            return [recipe.to_dict() for recipe in user.recipes], 200
        
        return {'error': '401 Unauthorized'}, 401
        
    def post(self):

        if session.get('user_id'):

            request_json = request.get_json()

            title = request_json['title']
            instructions = request_json['instructions']
            minutes_to_complete = request_json['minutes_to_complete']

            try:

                recipe = Recipe(
                    title=title,
                    instructions=instructions,
                    minutes_to_complete=minutes_to_complete,
                    user_id=session['user_id'],
                )

                db.session.add(recipe)
                db.session.commit()

                return recipe.to_dict(), 201

            except IntegrityError:

                return {'error': '422 Unprocessable Entity'}, 422

        return {'error': '401 Unauthorized'}, 401

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(RecipeIndex, '/recipes', endpoint='recipes')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
