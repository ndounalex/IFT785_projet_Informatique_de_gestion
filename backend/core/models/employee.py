from django.db import models
from .common import common

class Employee(common):  # STUDENT 
    firstname = models.TextField()
    lastname = models.TextField()