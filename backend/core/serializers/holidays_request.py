from rest_framework import serializers
from core.models import HolidaysRequest
from .employee import EmployeeSerializer

class HolidaysRequestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HolidaysRequest
        fields = ['id', 'holidays_begin', 'holidays_end', 'owner','status']

class TeamHolidaysRequestSerializer(serializers.ModelSerializer):
    owner = EmployeeSerializer()
    class Meta:
        model = HolidaysRequest
        fields = ['id', 'holidays_begin', 'holidays_end', 'owner','status']