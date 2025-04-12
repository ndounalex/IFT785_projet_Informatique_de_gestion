from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from core.models import Training, TrainingRegistration
from core.serializers import TrainingSerializer, TrainingRegistrationSerializer, ManagerTrainingRegistrationSerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .factories import *
from datetime import date

class CrudTrainingView(APIView):
    authentication_classes = [TokenAuthentication]
    #permission_classes = [IsAuthenticated]

    def post(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        #user = self.request.user

        start_date = request.data["start_date"]
        end_date = request.data["end_date"]
        title = request.data["title"]
        description = request.data["description"]
        prerequisite_skills = request.data["prerequisite_skills"] if 'prerequisite_skills' in request.data else []
        acquired_skills = request.data["acquired_skills"] if 'acquired_skills' in request.data else []
        training = Training.objects.create(
            start_date=start_date,
            end_date=end_date,
            title=title,
            description=description,
        )
        training.prerequisite_skills.set(prerequisite_skills)
        training.acquired_skills.set(acquired_skills)
        training.save()
        serializer = TrainingSerializer(training)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        items = Training.objects.filter(is_deleted=False)
        serializer = TrainingSerializer(items, many=True)
        return Response(serializer.data)

class TrainingRegistrationView(APIView):
    authentication_classes = [TokenAuthentication]
    #permission_classes = [IsAuthenticated]

    def post(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        #user = self.request.user

        trainings= request.data["trainings"]
        try:
            trainings = TrainingRequestFactory.create(
                trainings,user
            )
            serializer = TrainingRegistrationSerializer(trainings, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=400)

    def get(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        items = TrainingRegistration.objects.filter(is_deleted=False, owner=user)
        serializer = TrainingRegistrationSerializer(items, many=True)
        return Response(serializer.data)

class ValidateTrainingRequestView(APIView):
    authentication_classes = [TokenAuthentication]
    #permission_classes = [IsAuthenticated]

    def post(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        #user = self.request.user
        manager = Employee.objects.filter(
            team=user.team,
            is_manager=True
        ).first()
        training = TrainingRegistration.objects.get(id=request.data['id'])
        try:
            validation = TrainingRegistrationValidationFactory.validate(
                training,
                decision = request.data['decision'],
                reason=request.data['reason'] if 'reason' in request.data else None
            )
            return Response({"message": f"request {validation.status.lower()}."})
        except Exception as e:
            return Response({"error": str(e)}, status=400)

class ManagerTrainingRegistrationView(APIView):
    authentication_classes = [TokenAuthentication]
    #permission_classes = [IsAuthenticated]

    def get(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        items = TrainingRegistration.objects.filter(is_deleted=False, owner__team=user.team)
        serializer = ManagerTrainingRegistrationSerializer(items, many=True)
        return Response(serializer.data)