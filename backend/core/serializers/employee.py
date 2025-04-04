from rest_framework import serializers
from core.models import Employee
from .team import TeamCreateSerializer
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer


class EmployeeSerializer(serializers.ModelSerializer):
    team = TeamCreateSerializer()
    class Meta:
        model = Employee
        fields = ('id', 'firstname', 'lastname', 'email', 'team')



class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = Employee
        fields = ['lastname', 'email', 'username', 'password', 'is_manager', 'team']