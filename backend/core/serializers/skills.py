from rest_framework import serializers
from core.models import Skills

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = '__all__'