from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)

    #     # Add custom claims
    #     token['firstname'] = user.firstname
    #     token['lastname'] = user.lastname
    #     token['is_manager'] = user.is_manager
    #     token['is_admin'] = user.is_admin
    #     token['team'] = user.team.id

    #     return {'access_token':token.access_token, 'refresh': token.refresh_token, 'user': {
    #         'firstname': user.firstname,
    #         'lastname': user.lastname,
    #         'is_manager': user.is_manager,
    #         'is_admin': user.is_admin,
    #         'team': user.team.id
    #     }}
    
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data["refresh"] = str(refresh)   # comment out if you don't want this
        data["access"] = str(refresh.access_token)
        user = self.user
        data["user"] = {
            'firstname': user.firstname,
            'lastname': user.lastname,
            'is_manager': user.is_manager,
            'is_admin': user.is_admin,
            'team': user.team.id,
            'id':user.id
        }
        """ Add extra responses here should you wish
        data["userid"] = self.user.id
        data["my_favourite_bird"] = "Jack Snipe"
        """
        return data