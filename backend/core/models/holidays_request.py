from django.db import models
from core.models.common import common
from core.models.employee import Employee
from datetime import datetime
from core.models.choices import STATUS_REQUEST_CHOICES, STATUS_IN_TREATMENT, STATES
from .state_vacation import InTreatment, Approved, Rejected

STATES = {
    "I": InTreatment(),
    "V": Approved(),
    "R": Rejected(),
}
class HolidaysRequest(common):
    max_absences = models.IntegerField(default=1)
    year_holiday_number = models.IntegerField(default=15)
    holidays_begin = models.DateField()
    holidays_end = models.DateField()
    vacation_type = models.ForeignKey(
        "VacationType",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="vacation_type",
    )
    is_deleted = models.BooleanField(default=False)
    request_date = models.DateField(default=datetime.now)
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
    comments = models.TextField(null=True, blank=True)
    
    def get_state(self):
        return STATES[self.status]

    def approved(self):
        self.get_state().approved(self)

    def rejected(self):
        self.get_state().rejected(self)

class VacationType(common):
    label = models.CharField(max_length=255)
    max_duration = models.IntegerField(null=True, blank=True)
    justification_required = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.label

class VacationBalance(common):
    balance = models.IntegerField()
    vacation_type = models.ForeignKey(
        VacationType,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="vacation_balance",
    )
    owner = models.ForeignKey(
        Employee,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="vacation_balance",
    )
    is_deleted = models.BooleanField(default=False)

class VacationValidation(common):
    vacation_request = models.ForeignKey(
        HolidaysRequest,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="vacation_validation",
    )
    manager = models.ForeignKey(
        Employee,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="vacation_validation",
    )
    validation_date = models.DateField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)
    decision = models.CharField(
        max_length=1, choices=STATUS_REQUEST_CHOICES, default=STATUS_IN_TREATMENT
    )
    reason = models.TextField(null=True, blank=True)