from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from core.models.holidays_request import HolidaysRequest
from core.serializers import HolidaysRequestCreateSerializer,TeamHolidaysRequestSerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class CrudHolidaysRequestView(APIView):
    authentication_classes = [TokenAuthentication]
    #permission_classes = [IsAuthenticated]

    def post(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        #user = self.request.user
        print(user)
        print(user.id)
        print(request)
        holidays_begin = request.data["holidays_begin"]
        holidays_end = request.data["holidays_end"]
        holiday = HolidaysRequest.objects.create(holidays_begin=holidays_begin, holidays_end=holidays_end, owner_id=user.id)
        items = HolidaysRequest.objects.all()
        serializer = HolidaysRequestCreateSerializer(holiday)
        return Response(serializer.data)

    def get(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        items = HolidaysRequest.objects.filter(owner_id=user.id)
        serializer = HolidaysRequestCreateSerializer(items, many=True)
        return Response(serializer.data)

class TeamHolidaysRequestView(APIView):
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        team = user.team        
        items = HolidaysRequest.objects.filter(owner__team=team, is_deleted=False)
        serializer = TeamHolidaysRequestSerializer(items, many=True)
        return Response(serializer.data)