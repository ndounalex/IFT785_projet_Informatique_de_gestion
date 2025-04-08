
from rest_framework.views import APIView
from rest_framework.response import Response
from core.models.holidays_request import VacationType
from core.serializers import VacationTypeSerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.authentication import TokenAuthentication
#from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .factories import *

class CrudVacationTypesView(APIView):
    authentication_classes = [TokenAuthentication]
    #permission_classes = [IsAuthenticated]

    def get(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        items = VacationType.objects.filter(is_deleted=False)
        serializer = VacationTypeSerializer(items, many=True)
        return Response(serializer.data)
