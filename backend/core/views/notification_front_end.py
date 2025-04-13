from rest_framework.views import APIView
from rest_framework.response import Response
from core.serializers import NotificationFrontEndSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from core.models import NotificationFrontEnd


class NotificationFrontEndView(APIView):
    authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        items = NotificationFrontEnd.objects.filter(
            is_deleted=False, vue=False, owner=user
        )
        serializer = NotificationFrontEndSerializer(items, many=True)
        return Response(serializer.data)

    def put(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        notification = request.data["id"]
        item = NotificationFrontEnd.objects.filter(
            is_deleted=False, vue=False, id=notification, owner=user
        ).first()
        if item:
            item.vue = True
            item.save()
            serializer = NotificationFrontEndSerializer(item)
            return Response(serializer.data)
        return Response({"message": f"Notification {notification} not found."})
