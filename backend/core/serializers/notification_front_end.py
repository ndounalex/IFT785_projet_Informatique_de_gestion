from rest_framework import serializers
from core.models import NotificationFrontEnd


class NotificationFrontEndSerializer(serializers.ModelSerializer):
    requester = serializers.SerializerMethodField()

    class Meta:
        model = NotificationFrontEnd
        fields = '__all__'
    
    def get_requester(self, notification):
        if notification.training_request:
            return notification.training_request.owner.id
        return notification.request.owner.id