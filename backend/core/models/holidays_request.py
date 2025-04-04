from django.db import models
from core.models.common import common
from core.models.employee import Employee
from core.models.choices import STATUS_REQUEST_CHOICES, STATUS_IN_TREATMENT


class HolidaysRequest(common):
    max_absences = models.IntegerField(default=1)
    year_holiday_number = models.IntegerField(default=15)
    holidays_begin = models.DateField()
    holidays_end = models.DateField()
    owner = models.ForeignKey(
        Employee,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="request",
    )
    status = models.CharField(
        max_length=1, choices=STATUS_REQUEST_CHOICES, default=STATUS_IN_TREATMENT
    )
