import pytest 
from datetime import datetime
import requests


def test_login():
    url = "http://localhost:8000/auth/jwt/create"  # Replace with your mock API URL
    user ={
        "username": "suarez@gmail.com",
        "password": "test@123456789",
        "email": "suarez@gmail.com"
    }
    response = requests.post(url, json=user)

    assert response.status_code == 200
    assert response.headers["Content-Type"] == "application/json"

    # Check if the book was created (specifics depend on your mock API's response)
    data = response.json()
    assert "user" in data
    assert "refresh" in data
    assert "access" in data

    print(data)

    return data["access"]

def test_logout(user_refresh):
    url = "http://localhost:8000/auth/logout/"  # Replace with your mock API URL
    user ={
        "refresh": user_refresh,
    }
    response = requests.post(url, json=user)

    assert response.status_code == 200
