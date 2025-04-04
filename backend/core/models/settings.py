from django.db import models
from core.models.common import common

class Settings(common):
    max_absences = models.IntegerField(default=1)
    year_holiday_number = models.IntegerField(default=15)