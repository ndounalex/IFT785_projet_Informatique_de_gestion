import pytest 
from datetime import datetime
import requests

@pytest.mark.django_db
def test_employee_serializer():
    from core.models import Employee
    from core.serializers import EmployeeSerializer, UserCreateSerializer

    data = {
            'lastname':'suarez',
            'firstname':'gigi',
            'email':   'ndounalex@yahoo.fr',
            'password':'test@123456789',
            'username':'ndounalex@yahoo.fr',
            'is_manager':False,
            'team_id':1
     }
    mm = UserCreateSerializer(data=data)

    assert mm.is_valid() == True # won't show errors