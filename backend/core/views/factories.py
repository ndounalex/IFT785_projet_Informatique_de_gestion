from core.models import *
from datetime import date
from django.core.exceptions import ValidationError
from core import notification_manager

class HolidaysRequestFactory:
    @staticmethod
    def create(start_date, end_date, vacation_type, owner, comments=None):
        first_date = date.fromisoformat(start_date)
        last_date = date.fromisoformat(end_date)
        if first_date > last_date:
            raise ValidationError("La date de début doit être antérieure à la date de fin.")
        vacationType = VacationType.objects.get(id=vacation_type)
        if (last_date - first_date).days > vacationType.max_duration:
            raise ValidationError("La durée des vacances dépasse la durée maximale autorisée.")
        vacationBalance = VacationBalance.objects.get(vacation_type=vacationType, owner=owner)
        if vacationBalance.balance < (last_date - first_date).days:
            raise ValidationError("Le solde de vacances est insuffisant.")
        request = HolidaysRequest(
            owner=owner,
            holidays_begin=start_date,
            holidays_end=end_date,
            status="I",
            comments=comments,
            vacation_type=vacationType
        )
        request.save()
        notification_manager.notify(request, "crée")
        return request

class VacationValidationFactory:
    @staticmethod
    def validate(request: HolidaysRequest, manager, decision, reason=None):
        if decision not in ['V', 'R']:
            raise ValidationError("Décision invalide.")

        validation = VacationValidation(
            vacation_request=request,
            manager=manager,
            decision=decision,
            reason=reason
        )
        validation.save()

        # Mise à jour de l'état via le State Pattern
        if decision == "V":
            request.approved()
            notification_manager.notify(request, "validée")
        else:
            request.rejected()
            notification_manager.notify(request, "refusée")

        return validation
