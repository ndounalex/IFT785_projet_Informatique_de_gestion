import pytest
import requests


def test_get_skills_list(request_header):
    url = "http://localhost:8000/api/skills_list/"  # Replace with your mock API URL
    response = requests.get(url, headers=request_header)

    assert response.status_code == 200
    assert response.headers["Content-Type"] == "application/json"

    # Check if the book was created (specifics depend on your mock API's response)
    data = response.json()
    print(data)


def test_create_skill(request_header):
    url = "http://localhost:8000/api/skills/"  # Replace with your mock API URL
    data = {"level": "A", "name": "Architecture", "description": "sqdfqsdfqsfqf"}
    response = requests.post(url, headers=request_header, json=data)

    assert response.status_code == 200
    assert response.headers["Content-Type"] == "application/json"

    # Check if the book was created (specifics depend on your mock API's response)
    data = response.json()
    print(data)


def test_update_skill(request_header):
    url = "http://localhost:8000/api/skills/"  # Replace with your mock API URL
    data = {
        "level": "A",
        "name": "Architecture II",
        "description": "sqdfqsdfqsfqf",
        "skill_id": 1,
    }
    response = requests.put(url, headers=request_header, json=data)

    assert response.status_code == 200
    assert response.headers["Content-Type"] == "application/json"

    # Check if the book was created (specifics depend on your mock API's response)
    data = response.json()
    print(data)
