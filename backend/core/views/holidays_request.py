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
from .factories import *
from datetime import date
class CrudHolidaysRequestView(APIView):
    authentication_classes = [TokenAuthentication]
    #permission_classes = [IsAuthenticated]

    def post(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        #user = self.request.user
        holidays_begin = request.data["holidays_begin"]
        holidays_end = request.data["holidays_end"]
        data = request.data
        try:
            holiday = HolidaysRequestFactory.create(
                holidays_begin,
                holidays_end,
                data['vacation_type'],
                user,
                data['comments'],
            )
            serializer = HolidaysRequestCreateSerializer(holiday)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

    def get(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        items = HolidaysRequest.objects.filter(owner_id=user.id)
        serializer = HolidaysRequestCreateSerializer(items, many=True)
        return Response(serializer.data)


class ValidateHolidaysRequestView(APIView):
    authentication_classes = [TokenAuthentication]
    #permission_classes = [IsAuthenticated]

    def post(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        #user = self.request.user
        manager = Employee.objects.filter(
            team=user.team,
            is_manager=True
        ).first()
        holiday = HolidaysRequest.objects.get(id=request.data['id'])
        try:
            validation = VacationValidationFactory.validate(
                request=holiday,
                manager=manager,
                decision=request.data['decision'],
                reason=request.data['reason'] if 'reason' in request.data else None
            )
            return Response({"message": f"request {validation.decision.lower()}."})
        except Exception as e:
            return Response({"error": str(e)}, status=400)


class TeamHolidaysRequestView(APIView):
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        team = user.team        
        items = HolidaysRequest.objects.filter(owner__team=team, is_deleted=False)
        serializer = TeamHolidaysRequestSerializer(items, many=True)
        return Response(serializer.data)