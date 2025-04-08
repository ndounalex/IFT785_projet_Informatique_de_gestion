from rest_framework import serializers
from core.models import HolidaysRequest
from .employee import EmployeeSerializer
from .vacation_type import VacationTypeSerializer

class HolidaysRequestCreateSerializer(serializers.ModelSerializer):
    vacation_type = VacationTypeSerializer()
    class Meta:
        model = HolidaysRequest
        fields = ['id', 'holidays_begin', 'holidays_end', 'owner','status', 'comments','vacation_type']

class TeamHolidaysRequestSerializer(serializers.ModelSerializer):
    owner = EmployeeSerializer()
    vacation_type = VacationTypeSerializer()
    class Meta:
        model = HolidaysRequest
        fields = ['id', 'holidays_begin', 'holidays_end', 'owner','status', 'comments','vacation_type']