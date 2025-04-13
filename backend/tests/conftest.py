import pytest
import requests


@pytest.fixture
@pytest.mark.django_db
def user_login():
    url = "http://localhost:8000/auth/jwt/create"  # Replace with your mock API URL
    user ={
        "username": "suarez@gmail.com",
        "password": "test@123456789",
        "email": "suarez@gmail.com"
    }
    response = requests.post(url, json=user)

    # Check if the book was created (specifics depend on your mock API's response)
    data = response.json()

    print(data)

    return data

@pytest.fixture
@pytest.mark.django_db
def user_jwt_token(user_login):
    return user_login["access"]

@pytest.fixture
def user_refresh(user_login):
    return user_login["refresh"]

@pytest.fixture
def request_header(user_jwt_token):
    return {
        "Authorization": f"JWT {user_jwt_token}",
        "Content-Type": "application/json"
    }

# @pytest.fixture()
# def gestion_mesure():
#     return GestionMesure()

# @pytest.fixture()
# def address():
#     return Address("toto", "toto", "toto", "toto")

# @pytest.fixture()
# def home(address):
#     return Home(address)

# @pytest.fixture()
# def room(home, gestion_mesure):
#     return Room("R1", home, None, gestion_mesure)

# @pytest.fixture()
# def runner(app):
#     return app.test_cli_runner()

# @pytest.fixture #test fixture decorator
# def alert_factory():
#     type_alert ="temperature"
#     factory = AlertFactoryRegistry.get_factory(type_alert)
#     return factory
