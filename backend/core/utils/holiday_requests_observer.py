from abc import ABC, abstractmethod
from core.utils.email_notification_manager_singleton import EmailNotificationManager
from core.utils.notification_adapter import NotificationFrontEndAdapter, notify_user

class HolidayRequestObserver(ABC):
    @abstractmethod
    def update(self, holiday_request, event: str):
        pass


class FrontEndNotifier(HolidayRequestObserver):

    def update(self, holiday_request, event: str):
        from core.models import NotificationFrontEnd
        from core.models import Employee
        print(
            f"[Notification] Demande de congé #{holiday_request.id} faite par {holiday_request.owner} a été {event}."
        )
        notify_user(
            NotificationFrontEndAdapter,
            holiday_request.owner,
            f"Demande de congé #{holiday_request.id} faite par {holiday_request.owner} a été {event}.",
            holiday_request=holiday_request,
            training_request=None,
            subject=None)
        manager = Employee.objects.filter(
            team=holiday_request.owner.team, is_manager=True
        ).first()
        if manager:
            notify_user(
                NotificationFrontEndAdapter,
                manager,
                f"Demande de congé #{holiday_request.id} faite par {holiday_request.owner} a été {event}.",
                holiday_request=holiday_request,
                training_request=None,
                subject=None)


class EmailNotifier(HolidayRequestObserver):
    def __init__(self, mail_notification_manager: EmailNotificationManager):
        self._mail_notification_manager = mail_notification_manager

    def update(self, holiday_request, event: str):
        print(
            f"[Email] À {holiday_request.owner} : votre demande a été {event.lower()}."
        )  # Simulé
        return notify_user(
            self._mail_notification_manager,
            holiday_request.owner,
            f"Bonjour,\n\nLa demande de congé a été {event.lower()}.\n\nCordialement,\nL'équipe de gestion des congés",
            holiday_request=holiday_request,
            training_request=None,
            subject=f"Demande #{holiday_request.id} {event}")


class NotificationManager:
    def __init__(self):
        self.observers = []

    def save(self, observer):
        self.observers.append(observer)

    def notify(self, holiday_request, event: str):
        for obs in self.observers:
            obs.update(holiday_request, event)


notification_manager = NotificationManager()
