from django.db import models
from .common import common
from datetime import datetime
from core.models.choices import (
    REGISTRATION_STATUS_CHOICES,
    REGISTRATION_STATUS_PLANNED,
)
from .state_vacation import InTreatment, Approved, Rejected
from core.models.skills import Skills
from core.models.choices import STATUS_REQUEST_CHOICES, STATUS_IN_TREATMENT

STATES = {
    "I": InTreatment(),
    "V": Approved(),
    "R": Rejected(),
}

class Training(common):
    title = models.TextField()
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    prerequisite_skills = models.ManyToManyField(
        Skills, related_name="prerequisite_skills", blank=True
    )
    acquired_skills = models.ManyToManyField(
        Skills, related_name="acquired_skills", blank=True
    )
    status = models.CharField(max_length=1, choices=REGISTRATION_STATUS_CHOICES, default=REGISTRATION_STATUS_PLANNED)
    def __str__(self):
        return f"{self.title}"


class TrainingRegistration(common):
    owner = models.ForeignKey(
        "Employee", on_delete=models.CASCADE, related_name="registrations"
    )
    training = models.ForeignKey(
        "Training", on_delete=models.CASCADE, related_name="registrations"
    )
    registration_date = models.DateField(default=datetime.now)
    status = models.CharField(
        max_length=1, choices=STATUS_REQUEST_CHOICES, default=STATUS_IN_TREATMENT
    )
    is_present = models.BooleanField(default=False)
    reason = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.owner} - {self.training} ({self.status})"
    
    def get_state(self):
        return STATES[self.status]

    def approved(self):
        self.get_state().approved(self)

    def rejected(self):
        self.get_state().rejected(self)
