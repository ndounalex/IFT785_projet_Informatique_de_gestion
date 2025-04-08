from django.db import models
from .common import common
from django.contrib.auth.models import AbstractUser
from core.models.team import Team
from datetime import datetime
from core.models.skills import Skills

class Employee(common, AbstractUser):  # STUDENT 
    firstname = models.TextField()
    lastname = models.TextField()
    email = models.EmailField(unique=True)
    is_manager = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    my_manager = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='subordinates')
    is_active = models.BooleanField(default=True)
    holiday_balance = models.IntegerField(default=15)
    hiring_date = models.DateField(default=datetime.now)
    skills = models.ManyToManyField(
        Skills, related_name="employee_acquired_skills", blank=True
    )
    team = models.ForeignKey(Team, on_delete=models.CASCADE, null=True, blank=True, related_name='members')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['lastname']
    
    def __str__(self):
        return f"{self.firstname} {self.lastname} ({self.email})"
    
    def get_full_name(self):    
        return f"{self.firstname} {self.lastname}"