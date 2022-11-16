import flask
import pytest

from app import app
from models import db, User

app.secret_key = b'a\xdb\xd2\x13\x93\xc1\xe9\x97\xef2\xe3\x004U\xd1Z'

class TestApp:
    '''Flask API in app.py'''

    def test_passes(self):
        '''passes.'''
        assert(True)

    # def test_creates_users_at_signup(self):
    #     '''creates user records with usernames and passwords at /signup.'''
        
    #     with app.app_context():
            
    #         User.query.delete()
    #         db.session.commit()
        
    #     with app.test_client() as client:
            
    #         response = client.post('/signup', json={
    #             'username': 'ash',
    #             'password': 'pikachu',
    #         })

    #         assert(response.json['username'] == 'ash')
    #         assert(User.query.filter(User.username == 'ash').first())

    # def test_logs_in(self):
    #     '''logs users in with a username and password at /login.'''
    #     with app.app_context():
            
    #         User.query.delete()
    #         db.session.commit()
        
    #     with app.test_client() as client:

    #         client.post('/signup', json={
    #             'username': 'ash',
    #             'password': 'pikachu',
    #         })

    #         response = client.post('/login', json={
    #             'username': 'ash',
    #             'password': 'pikachu',
    #         })

    #         assert(response.get_json()['username'] == 'ash')

    #         with client.session_transaction() as session:
    #             assert(session.get('user_id') == \
    #                 User.query.filter(User.username == 'ash').first().id)

    # def test_logs_out(self):
    #     '''logs users out at /logout.'''
    #     with app.app_context():
            
    #         User.query.delete()
    #         db.session.commit()
        
    #     with app.test_client() as client:

    #         client.post('/signup', json={
    #             'username': 'ash',
    #             'password': 'pikachu',
    #         })

    #         client.post('/login', json={
    #             'username': 'ash',
    #             'password': 'pikachu',
    #         })

    #         # check if logged in
    #         with client.session_transaction() as session:
    #             assert(session['user_id'])

    #         # check if logged out
    #         response = client.delete('/logout')
    #         with client.session_transaction() as session:
    #             assert(not session['user_id'])
            


    # def test_checks_for_session(self):
    #     '''checks if a user is authenticated and returns the user as JSON at /check_session.'''

    #     with app.app_context():
            
    #         User.query.delete()
    #         db.session.commit()
        
    #     with app.test_client() as client:

    #         client.post('/signup', json={
    #             'username': 'ash',
    #             'password': 'pikachu',
    #         })

    #         client.post('/login', json={
    #             'username': 'ash',
    #             'password': 'pikachu',
    #         })

    #         response = client.get('/check_session')
            
    #         assert(response.get_json()['username'] == 'ash')

    #         client.delete('/logout')
            
    #         response = client.get('/check_session')
            
    #         assert(response.status_code == 204)
    #         assert(not response.data)
