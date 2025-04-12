class NotificationSender:
    def send(
        self, recipient, message: str, holiday_request, training_request, subject: str
    ):
        raise NotImplementedError()


class NotificationFrontEndAdapter(NotificationSender):
    @staticmethod
    def send(
        recipient,
        message: str,
        holiday_request=None,
        training_request=None,
        subject: str = None,
    ):
        from core.models import NotificationFrontEnd
        from core.models import Employee

        notification = NotificationFrontEnd(
            owner=recipient,
            training_request=training_request,
            request=holiday_request,
            message=message,
        )
        notification.save()


def notify_user(
    adapter: NotificationSender,
    recipient,
    message: str,
    holiday_request,
    training_request,
    subject: str,
):
    adapter.send(recipient, message, holiday_request, training_request, subject)
