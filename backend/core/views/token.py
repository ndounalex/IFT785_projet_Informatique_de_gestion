from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from core.serializers import MyTokenObtainPairSerializer


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer