import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from core.utils.notification_adapter import NotificationSender
class UniqueNotificationTypeManager(type):
    """
    A metaclass that ensures only one instance of a class with a specific
    notification type exists.
    """

    def __init__(cls, name, bases, attrs):
        super().__init__(name, bases, attrs)
        cls._instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]

class EmailNotificationManager(NotificationSender, metaclass=UniqueNotificationTypeManager):
    """
    A singleton class to manage email notifications.
    """

    def __init__(self, email: str, password: str, server: str, port: int):
        self._email = email
        self._password = password
        self._server = server
        self._port = port

    def send(self, recipient, message: str, holiday_request, training_request, subject: str):
        """
        Simulate sending an email.
        In a real-world scenario, you would use an email library like smtplib.
        """
        print(f"Sending email to {recipient} with subject '{subject}' and body '{message}'")
        try:
            msg = MIMEMultipart()
            msg['From'] = self._email
            msg['To'] = recipient.email,
            msg['Subject'] = subject
            msg.attach(MIMEText(message, 'plain'))
            with smtplib.SMTP(self._server, self._port) as server:
                server.starttls()
                server.login(self._email, self._password)
                server.sendmail(self._email, recipient, msg.as_string())
                return True
        except Exception as e:
            print(f"Failed to send email: {e}")
            return False