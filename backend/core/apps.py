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
        from .utils.email_notification_manager_singleton import (
            EmailNotificationManager,
        )

        notification_manager.save(FrontEndNotifier())
        notification_manager.save(
            EmailNotifier(
                EmailNotificationManager(
                    "testift785@gmail.com", "ktrq sdob zgjk ufcs", "smtp.gmail.com", 587
                )
            )
        )
        #return super().ready()
