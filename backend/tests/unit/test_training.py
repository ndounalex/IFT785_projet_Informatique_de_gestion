import pytest
import requests
def test_get_teams_list(request_header):
    url = "http://localhost:8000/api/training/"  # Replace with your mock API URL
    response = requests.get(url, headers=request_header)

    assert response.status_code == 200    
    assert response.headers["Content-Type"] == "application/json"

    # Check if the book was created (specifics depend on your mock API's response)
    data = response.json()
    print(data)

def test_create_training(request_header):
    url = "http://localhost:8000/api/training/"  # Replace with your mock API URL
    data = {
	    "acquired_skills": [3],
        "prerequisite_skills": [2],
        "title": "Training A",
        "description": "Training description",
        "start_date": "2025-04-12",
        "end_date": "2025-04-26",
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

def test_subscribe_to_training(request_header):
    url = "http://localhost:8000/api/training_registration/"  # Replace with your mock API URL
    data = {"trainings":[3]}
    response = requests.post(url, headers=request_header, json=data)

    assert response.status_code == 201  
    assert response.headers["Content-Type"] == "application/json"

    # Check if the book was created (specifics depend on your mock API's response)
    data = response.json()
    print(data)

def test_training_request_validation(request_header):
    url = "http://localhost:8000/api/training_registration_validate/"  # Replace with your mock API URL
    data = {"decision":"V","comments":"qsdqSD","id":57}
    response = requests.post(url, headers=request_header, json=data)

    assert response.status_code == 200 
    assert response.headers["Content-Type"] == "application/json"

    # Check if the book was created (specifics depend on your mock API's response)
    data = response.json()
    print(data)
