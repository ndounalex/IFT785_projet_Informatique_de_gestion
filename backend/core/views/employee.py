from django.shortcuts import render
from rest_framework import viewsets
from core.serializers.employee import EmployeeSerializer
from core.models.employee import Employee

# Create your views here.

class EmployeeView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()