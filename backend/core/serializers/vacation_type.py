from rest_framework import serializers
from core.models import VacationType

class VacationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VacationType
        fields = '__all__'
