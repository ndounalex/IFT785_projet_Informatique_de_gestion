from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from core.models import Skills
from core.serializers import SkillSerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class SkillView(APIView):
    authentication_classes = [TokenAuthentication]
    #permission_classes = [IsAuthenticated]

    def post(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        name = request.data["name"]
        description = request.data["description"]
        level = request.data["level"]
        skill = Skills.objects.create(name=name, description=description, level=level)
        serializer = SkillSerializer(skill)
        return Response(serializer.data)
    
    def put(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        name = request.data["name"]
        skill_id = request.data["skill_id"]
        skill = Skills.objects.filter(id=skill_id).first()
        skill.name = name
        if "description" in request.data:
            skill.description = request.data["description"]
        if "level" in request.data:
            skill.level = request.data["level"]
        if "is_deleted" in request.data:
            skill.is_deleted = request.data["is_deleted"]
        skill.save()
        serializer = SkillSerializer(skill)
        return Response(serializer.data)

    def get(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        skill_id = request.query_params.get('skill_id')
        skill = Skills.objects.filter(id=skill_id).first()
        serializer = SkillSerializer(skill)
        return Response(serializer.data)

class ListSkillView(APIView):
    authentication_classes = [TokenAuthentication]
    #permission_classes = [IsAuthenticated]

    def get(self, request):
        user = JWTAuthentication().authenticate(request)[0]
        skills = Skills.objects.filter(is_deleted=False)
        serializer = SkillSerializer(skills, many=True)
        return Response(serializer.data)