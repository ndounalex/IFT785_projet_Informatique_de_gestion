from django.db import models
from .common import common
from datetime import datetime
from core.models.choices import LEVEL_CHOICES, LEVEL_STARTER

class Skills(common):
    name = models.TextField()
    description = models.TextField()
    level = models.CharField(
        max_length=1, choices=LEVEL_CHOICES, default=LEVEL_STARTER
    )
    
    def __str__(self):
        return f"{self.name}"