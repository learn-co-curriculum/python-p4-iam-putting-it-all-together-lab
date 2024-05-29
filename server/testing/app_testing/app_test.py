from faker import Faker
import flask
import pytest
from random import randint, choice as rc

from app import app
from models import db, User, Recipe

app.secret_key = b'a\xdb\xd2\x13\x93\xc1\xe9\x97\xef2\xe3\x004U\xd1Z'

class TestSignup:
    '''Signup resource in app.py'''

    def test_creates_users_at_signup(self):
        '''creates user records with usernames and passwords at /signup.'''
        
        with app.app_context():
            
            User.query.delete()
            db.session.commit()
        
        with app.test_client() as client:
            
            response = client.post('/signup', json={
                'username': 'ashketchum',
                'password': 'pikachu',
                'bio': '''I wanna be the very best
                        Like no one ever was
                        To catch them is my real test
                        To train them is my cause
                        I will travel across the land
                        Searching far and wide
                        Teach Pokémon to understand
                        The power that's inside''',
                'image_url': 'https://cdn.vox-cdn.com/thumbor/I3GEucLDPT6sRdISXmY_Yh8IzDw=/0x0:1920x1080/1820x1024/filters:focal(960x540:961x541)/cdn.vox-cdn.com/uploads/chorus_asset/file/24185682/Ash_Ketchum_World_Champion_Screenshot_4.jpg',
            })

            assert(response.status_code == 201)

            new_user = User.query.filter(User.username == 'ashketchum').first()

            assert(new_user)
            assert(new_user.authenticate('pikachu'))
            assert(new_user.image_url == 'https://cdn.vox-cdn.com/thumbor/I3GEucLDPT6sRdISXmY_Yh8IzDw=/0x0:1920x1080/1820x1024/filters:focal(960x540:961x541)/cdn.vox-cdn.com/uploads/chorus_asset/file/24185682/Ash_Ketchum_World_Champion_Screenshot_4.jpg')
            assert(new_user.bio == '''I wanna be the very best
                        Like no one ever was
                        To catch them is my real test
                        To train them is my cause
                        I will travel across the land
                        Searching far and wide
                        Teach Pokémon to understand
                        The power that's inside''')

    def test_422s_invalid_users_at_signup(self):
        '''422s invalid usernames at /signup.'''
        
        with app.app_context():
            
            User.query.delete()
            db.session.commit()
        
        with app.test_client() as client:
            
            response = client.post('/signup', json={
                'password': 'pikachu',
                'bio': '''I wanna be the very best
                        Like no one ever was
                        To catch them is my real test
                        To train them is my cause
                        I will travel across the land
                        Searching far and wide
                        Teach Pokémon to understand
                        The power that's inside''',
                'image_url': 'https://cdn.vox-cdn.com/thumbor/I3GEucLDPT6sRdISXmY_Yh8IzDw=/0x0:1920x1080/1820x1024/filters:focal(960x540:961x541)/cdn.vox-cdn.com/uploads/chorus_asset/file/24185682/Ash_Ketchum_World_Champion_Screenshot_4.jpg',
            })

            assert(response.status_code == 422)

class TestCheckSession:
    '''CheckSession resource in app.py'''

    def test_returns_user_json_for_active_session(self):
        '''returns JSON for the user's data if there is an active session.'''
        
        with app.app_context():
            
            User.query.delete()
            db.session.commit()
        
        with app.test_client() as client:

            # create a new first record
            client.post('/signup', json={
                'username': 'ashketchum',
                'password': 'pikachu',
                'bio': '''I wanna be the very best
                        Like no one ever was
                        To catch them is my real test
                        To train them is my cause
                        I will travel across the land
                        Searching far and wide
                        Teach Pokémon to understand
                        The power that's inside''',
                'image_url': 'https://cdn.vox-cdn.com/thumbor/I3GEucLDPT6sRdISXmY_Yh8IzDw=/0x0:1920x1080/1820x1024/filters:focal(960x540:961x541)/cdn.vox-cdn.com/uploads/chorus_asset/file/24185682/Ash_Ketchum_World_Champion_Screenshot_4.jpg',
            })
            
            with client.session_transaction() as session:
                
                session['user_id'] = 1

            response = client.get('/check_session')
            response_json = response.json

            assert response_json['id'] == 1
            assert response_json['username']

    def test_401s_for_no_session(self):
        '''returns a 401 Unauthorized status code if there is no active session.'''
        
        with app.test_client() as client:
            
            with client.session_transaction() as session:
                
                session['user_id'] = None

            response = client.get('/check_session')
            
            assert response.status_code == 401

class TestLogin:
    '''Login resource in app.py'''

    def test_logs_in(self):
        '''logs users in with a username and password at /login.'''
        
        with app.app_context():
            
            User.query.delete()
            db.session.commit()
        
        with app.test_client() as client:

            client.post('/signup', json={
                'username': 'ashketchum',
                'password': 'pikachu',
                'bio': '''I wanna be the very best
                        Like no one ever was
                        To catch them is my real test
                        To train them is my cause
                        I will travel across the land
                        Searching far and wide
                        Teach Pokémon to understand
                        The power that's inside''',
                'image_url': 'https://cdn.vox-cdn.com/thumbor/I3GEucLDPT6sRdISXmY_Yh8IzDw=/0x0:1920x1080/1820x1024/filters:focal(960x540:961x541)/cdn.vox-cdn.com/uploads/chorus_asset/file/24185682/Ash_Ketchum_World_Champion_Screenshot_4.jpg',
            })

            response = client.post('/login', json={
                'username': 'ashketchum',
                'password': 'pikachu',
            })

            assert(response.get_json()['username'] == 'ashketchum')

            with client.session_transaction() as session:
                assert(session.get('user_id') == \
                    User.query.filter(User.username == 'ashketchum').first().id)

    def test_401s_bad_logins(self):
        '''returns 401 for an invalid username and password at /login.'''
        
        with app.app_context():
            
            User.query.delete()
            db.session.commit()
        
        with app.test_client() as client:

            response = client.post('/login', json={
                'username': 'mrfakeguy',
                'password': 'paswerd',
            })

            assert response.status_code == 401

            with client.session_transaction() as session:
                assert not session.get('user_id')

class TestLogout:
    '''Logout resource in app.py'''

    def test_logs_out(self):
        '''logs users out at /logout.'''
        with app.app_context():
            
            User.query.delete()
            db.session.commit()
        
        with app.test_client() as client:

            client.post('/signup', json={
                'username': 'ashketchum',
                'password': 'pikachu',
            })

            client.post('/login', json={
                'username': 'ashketchum',
                'password': 'pikachu',
            })

            # check if logged out
            client.delete('/logout')
            with client.session_transaction() as session:
                assert not session.get('user_id')
            
    def test_401s_if_no_session(self):
        '''returns 401 if a user attempts to logout without a session at /logout.'''
        with app.test_client() as client:

            with client.session_transaction() as session:
                session['user_id'] = None
            
            response = client.delete('/logout')

            assert response.status_code == 401

class TestRecipeIndex:
    '''RecipeIndex resource in app.py'''

    def test_lists_recipes_with_200(self):
        '''returns a list of recipes associated with the logged in user and a 200 status code.'''

        with app.app_context():
            
            Recipe.query.delete()
            User.query.delete()
            db.session.commit()

            fake = Faker()

            user = User(
                username="Slagathor",
                bio=fake.paragraph(nb_sentences=3),
                image_url=fake.url(),
            )

            user.password_hash = 'secret'

            db.session.add(user)

            recipes = []
            for i in range(15):
                instructions = fake.paragraph(nb_sentences=8)
                
                recipe = Recipe(
                    title=fake.sentence(),
                    instructions=instructions,
                    minutes_to_complete=randint(15,90),
                )

                recipe.user = user

                recipes.append(recipe)

            db.session.add_all(recipes)

            db.session.commit()

        # start actual test here
        with app.test_client() as client:

            client.post('/login', json={
                'username': 'Slagathor',
                'password': 'secret',
            })

        
            response = client.get('/recipes')
            response_json = response.get_json()

            assert response.status_code == 200
            for i in range(15):
                assert response_json[i]['title']
                assert response_json[i]['instructions']
                assert response_json[i]['minutes_to_complete']

    def test_get_route_returns_401_when_not_logged_in(self):
        
        with app.app_context():
            
            Recipe.query.delete()
            User.query.delete()
            db.session.commit()

        # start actual test here
        with app.test_client() as client:

            with client.session_transaction() as session:
                
                session['user_id'] = None

            response = client.get('/recipes')
            
            assert response.status_code == 401

    def test_creates_recipes_with_201(self):
        '''returns a list of recipes associated with the logged in user and a 200 status code.'''

        with app.app_context():
            
            Recipe.query.delete()
            User.query.delete()
            db.session.commit()

            fake = Faker()

            user = User(
                username="Slagathor",
                bio=fake.paragraph(nb_sentences=3),
                image_url=fake.url(),
            )
            user.password_hash = 'secret'
            
            db.session.add(user)
            db.session.commit()

        # start actual test here
        with app.test_client() as client:

            client.post('/login', json={
                'username': 'Slagathor',
                'password': 'secret',
            })
            
            response = client.post('/recipes', json={
                'title': fake.sentence(),
                'instructions': fake.paragraph(nb_sentences=8),
                'minutes_to_complete': randint(15,90)
            })

            assert response.status_code == 201

            response_json = response.get_json()
            
            with client.session_transaction() as session:
                
                new_recipe = Recipe.query.filter(Recipe.user_id == session['user_id']).first()

            assert response_json['title'] == new_recipe.title
            assert response_json['instructions'] == new_recipe.instructions
            assert response_json['minutes_to_complete'] == new_recipe.minutes_to_complete

    def test_returns_422_for_invalid_recipes(self):
        with app.app_context():
            
            Recipe.query.delete()
            User.query.delete()
            db.session.commit()

            fake = Faker()

            user = User(
                username="Slagathor",
                bio=fake.paragraph(nb_sentences=3),
                image_url=fake.url(),
            )
            user.password_hash = 'secret'
            

            db.session.add(user)
            db.session.commit()

        # start actual test here
        with app.test_client() as client:

            client.post('/login', json={
                'username': 'Slagathor',
                'password': 'secret',
            })
            
            fake = Faker()

            response = client.post('/recipes', json={
                'title': fake.sentence(),
                'instructions': 'figure it out yourself!',
                'minutes_to_complete': randint(15,90)
            })

            assert response.status_code == 422
