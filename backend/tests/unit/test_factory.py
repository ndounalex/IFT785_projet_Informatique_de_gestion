import pytest 
from datetime import datetime
import requests


""" @pytest.mark.django_db
def test_holiday_factory_serializer():
    from core.models import Employee, VacationType
    from core.serializers import EmployeeSerializer, UserCreateSerializer
    from core import notification_manager, training_notification_manager
    
    from core.views.factories import HolidaysRequestFactory, VacationValidationFactory
    
    holiday = HolidaysRequestFactory.create(
        start_date='2025-04-12',
        end_date='2025-04-20',
        vacation_type=2,
        owner=Employee.objects.all().first(),
        comments="Test comment",
    )
    

    assert holiday != None # won't show errors """