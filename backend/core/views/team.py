from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from core.models import Team
from core.serializers import TeamCreateSerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class CrudTeamView(APIView):
    authentication_classes = [TokenAuthentication]
    #permission_classes = [IsAuthenticated]

    def post(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        name = request.data["name"]
        team = Team.objects.create(name=name)
        serializer = TeamCreateSerializer(team)
        return Response(serializer.data)
    
    def put(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        name = request.data["name"]
        team_id = request.data["team_id"]
        team = Team.objects.filter(id=team_id).first()
        team.name = name
        if "is_deleted" in request.data:
            team.is_deleted = request.data["is_deleted"]
        team.save()
        serializer = TeamCreateSerializer(team)
        return Response(serializer.data)

    def get(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        team_id = request.query_params.get('team_id')
        team = Team.objects.filter(id=team_id).first()
        serializer = TeamCreateSerializer(team)
        return Response(serializer.data)

class ListTeamView(APIView):
    authentication_classes = [TokenAuthentication]
    #permission_classes = [IsAuthenticated]

    def get(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        teams = Team.objects.filter(is_deleted=False)
        serializer = TeamCreateSerializer(teams, many=True)
        return Response(serializer.data)