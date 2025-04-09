from rest_framework import serializers
from core.models import Employee
from .team import TeamCreateSerializer
from core.serializers.skills import SkillSerializer
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer


class EmployeeSerializer(serializers.ModelSerializer):
    team = TeamCreateSerializer()
    skills = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = (
            "id",
            "firstname",
            "lastname",
            "email",
            "team",
            "skills",
            "is_manager",
        )
    
    def get_skills(self, employee):
        skills = employee.skills.all()
        return [SkillSerializer(skill).data for skill in skills]


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = Employee
        fields = ["lastname", "email", "username", "password", "is_manager", "team", "skills"]
