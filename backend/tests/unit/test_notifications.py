import pytest 
from datetime import datetime
import requests


def test_get_notification(request_header):
    url = "http://localhost:8000/api/notifications/"  # Replace with your mock API URL
    response = requests.get(url, headers=request_header)

    assert response.status_code == 200
    assert response.headers["Content-Type"] == "application/json"

    # Check if the book was created (specifics depend on your mock API's response)
    data = response.json()

    print(data)

def test_logout(user_refresh):
    url = "http://localhost:8000/auth/logout/"  # Replace with your mock API URL
    user ={
        "refresh": user_refresh,
    }
    response = requests.post(url, json=user)

    assert response.status_code == 200

def test_get_list_holiday(request_header):
    url = "http://localhost:8000/api/holiday_create/"  # Replace with your mock API URL
    response = requests.get(url, headers=request_header)

    assert response.status_code == 200
    assert response.headers["Content-Type"] == "application/json"

    # Check if the book was created (specifics depend on your mock API's response)
    data = response.json()

def test_create_holiday_request(request_header):
    url = "http://localhost:8000/api/holiday_create/"  # Replace with your mock API URL
    data = {
        "holidays_begin": "2025-04-12",
        "holidays_end": "2025-04-26",
        "vacation_type": 1,
        "comments": "qsdqSDQSD"
    }
    response = requests.post(url, headers=request_header, json=data)

    assert response.status_code == 201
    assert response.headers["Content-Type"] == "application/json"

    # Check if the book was created (specifics depend on your mock API's response)
    data = response.json()
    print(data)

def test_get_training_registration(request_header):
    url = "http://localhost:8000/api/training_registration/"  # Replace with your mock API URL
    response = requests.get(url, headers=request_header)

    assert response.status_code == 200
    assert response.headers["Content-Type"] == "application/json"

    # Check if the book was created (specifics depend on your mock API's response)
    data = response.json()
    print(data)

def test_add_training_registration(request_header):
    url = "http://localhost:8000/api/training_registration/"  # Replace with your mock API URL
    data = {
        "trainings": [1]
    }
    response = requests.post(url, headers=request_header, json=data)

    assert response.status_code == 201
    assert response.headers["Content-Type"] == "application/json"

    # Check if the book was created (specifics depend on your mock API's response)
    data = response.json()
    print(data)

def test_notification_view(request_header):
    url = "http://localhost:8000/api/notifications/"  # Replace with your mock API URL
    response = requests.put(url, headers=request_header, json={"id": 1})


    # Check if the book was created (specifics depend on your mock API's response)
    data = response.json()
    print(data)

def test_validate_holiday_request(request_header):
    url = "http://localhost:8000/api/holiday_validate/"  # Replace with your mock API URL
    data = {
        "id": 52, "decision": "V", "reason": ""
    }
    response = requests.post(url, headers=request_header, json=data)

    assert response.status_code == 200
    assert response.headers["Content-Type"] == "application/json"

    # Check if the book was created (specifics depend on your mock API's response)
    data = response.json()
    print(data)
