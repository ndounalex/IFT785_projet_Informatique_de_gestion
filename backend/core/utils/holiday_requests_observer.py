from abc import ABC, abstractmethod
from core.utils.email_notification_manager_singleton import EmailNotificationManager


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
        notification = NotificationFrontEnd(
            owner=holiday_request.owner,
            request=holiday_request,
            message=f"Demande de congé #{holiday_request.id} faite par {holiday_request.owner} a été {event}.",
        )
        notification.save()
        manager = Employee.objects.filter(
            team=holiday_request.owner.team, is_manager=True
        ).first()
        if manager:
            notification = NotificationFrontEnd(
                owner=manager,
                request=holiday_request,
                message=f"Demande de congé #{holiday_request.id} faite par {holiday_request.owner} a été {event}.",
            )
            notification.save()


class EmailNotifier(HolidayRequestObserver):
    def __init__(self, mail_notification_manager: EmailNotificationManager):
        self._mail_notification_manager = mail_notification_manager

    def update(self, holiday_request, event: str):
        print(
            f"[Email] À {holiday_request.owner} : votre demande a été {event.lower()}."
        )  # Simulé
        return self._mail_notification_manager.send_email(
            holiday_request.owner.email,
            f"Demande #{holiday_request.id} {event}",
            f"Bonjour,\n\nLa demande de congé a été {event.lower()}.\n\nCordialement,\nL'équipe de gestion des congés",
        )


class NotificationManager:
    def __init__(self):
        self.observers = []

    def save(self, observer):
        self.observers.append(observer)

    def notify(self, holiday_request, event: str):
        for obs in self.observers:
            obs.update(holiday_request, event)


notification_manager = NotificationManager()
