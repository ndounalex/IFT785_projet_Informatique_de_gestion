from django.db import models
from .common import common
from datetime import datetime

# type = models.CharField(max_length=50, choices=[
#     ('creation', 'Création'),
#     ('validation', 'Validation'),
#     ('rejet', 'Rejet'),
#     ('autre', 'Autre')
# ])


class NotificationFrontEnd(common):  # STUDENT
    owner = models.ForeignKey(
        'Employee', on_delete=models.CASCADE, related_name="notifications"
    )
    message = models.TextField()
    request = models.ForeignKey(
        "HolidaysRequest", on_delete=models.CASCADE, null=True, blank=True
    )
    training_request = models.ForeignKey(
        "TrainingRegistration", on_delete=models.CASCADE, null=True, blank=True
    )
    date = models.DateTimeField(default=datetime.now)
    vue = models.BooleanField(default=False)

    def __str__(self):
        return f"Notif pour {self.owner} - {self.message[:100]}"
