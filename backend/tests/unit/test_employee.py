import pytest
import requests
from datetime import date
import time

def test_get_employee_list(request_header):
    url = "http://localhost:8000/api/employees/"  # Replace with your mock API URL
    response = requests.get(url, headers=request_header)

    assert response.status_code == 200
    assert response.headers["Content-Type"] == "application/json"

    # Check if the book was created (specifics depend on your mock API's response)
    data = response.json()
    print(data)


def test_create_employee(request_header):
    url = "http://localhost:8000/auth/users/" 
    suffix = str(time.time())# Replace with your mock API URL
    suffix = suffix.replace(".","")
    data = {
        "lastname": "Lewandowski",
        "firstname": "Robert",
        "email": "robert121"+suffix+"@gmail.com",
        "team": 7,
        "username": "robert121"+suffix+"@gmail.com",
        "password": "test@123456789",
    }
    response = requests.post(url, headers=request_header, json=data)

    assert response.status_code == 201
    assert response.headers["Content-Type"] == "application/json"

    # Check if the book was created (specifics depend on your mock API's response)
    data = response.json()
    print(data)

def test_associate_skills_to_employee(request_header):
    url = "http://localhost:8000/api/associate_skills/"  # Replace with your mock API URL
    data = {"lastname":"Lewandowski","firstname":"Robert","email":"robert@gmail.com","team":7,"skills":[2,3,1],"id":7}
    response = requests.post(url, headers=request_header, json=data)
    assert response.status_code == 200
    assert response.headers["Content-Type"] == "application/json"

    # Check if the book was created (specifics depend on your mock API's response)
    data = response.json()
    print(data)
