from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'
    
    def ready(self):
        from .utils.holiday_requests_observer import (
            FrontEndNotifier,
            EmailNotifier,
            notification_manager
        )
        from core.utils.training_request_observer import (
            TrainingFrontEndNotifier,
            TrainingEmailNotifier,
            training_notification_manager,
        )
        from .utils.email_notification_manager_singleton import (
            EmailNotificationManager,
        )
        
        email_notification_manager = EmailNotificationManager(
                    "testift785@gmail.com", "ktrq sdob zgjk ufcs", "smtp.gmail.com", 587
                )

        notification_manager.save(FrontEndNotifier())
        notification_manager.save(
            EmailNotifier(
                email_notification_manager
            )
        )
        training_notification_manager.save(TrainingFrontEndNotifier())
        training_notification_manager.save(
            TrainingEmailNotifier(
                email_notification_manager
            )
        )
        #return super().ready()
