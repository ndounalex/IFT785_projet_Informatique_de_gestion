from django.db import models
from .common import common

class Team(common):  # STUDENT 
    name = models.TextField()
    
    def __str__(self):
        return f"{self.name}"
    