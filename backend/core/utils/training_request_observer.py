from abc import ABC, abstractmethod
from core.utils.email_notification_manager_singleton import EmailNotificationManager
from core.utils.notification_adapter import NotificationFrontEndAdapter, notify_user

class TrainingRequestObserver(ABC):
    @abstractmethod
    def update(self, training_request, event: str):
        pass


class TrainingFrontEndNotifier(TrainingRequestObserver):

    def update(self, training_request, event: str):
        from core.models import NotificationFrontEnd
        from core.models import Employee
        print(
            f"[Notification] Demande de formation #{training_request.id} faite par {training_request.owner} a été {event}."
        )
        notify_user(
            NotificationFrontEndAdapter,
            training_request.owner,
            f"Demande de formation #{training_request.id} faite par {training_request.owner} a été {event}.",
            holiday_request=None,
            training_request=training_request,
            subject=None,)
        manager = Employee.objects.filter(
            team=training_request.owner.team, is_manager=True
        ).first()
        if manager:
            notify_user(
                NotificationFrontEndAdapter,
                manager,
                f"Demande de formation #{training_request.id} faite par {training_request.owner} a été {event}.",
                holiday_request=None,
                training_request=training_request,
                subject=None,
            )


class TrainingEmailNotifier(TrainingRequestObserver):
    def __init__(self, mail_notification_manager: EmailNotificationManager):
        self._mail_notification_manager = mail_notification_manager

    def update(self, training_request, event: str):
        print(
            f"[Email] À {training_request.owner} : votre demande a été {event.lower()}."
        )  # Simulé
        return notify_user(
            self._mail_notification_manager,
            training_request.owner,
            f"Bonjour,\n\nLa demande de formation a été {event.lower()}.\n\nCordialement,\nL'équipe de gestion des formations",
            holiday_request=None,
            training_request=training_request,
            subject=f"Demande #{training_request.id} {event}",
        )


class TrainingNotificationManager:
    def __init__(self):
        self.observers = []

    def save(self, observer):
        self.observers.append(observer)

    def notify(self, training_request, event: str):
        for obs in self.observers:
            obs.update(training_request, event)


training_notification_manager = TrainingNotificationManager()
