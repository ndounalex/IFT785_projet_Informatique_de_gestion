from rest_framework import serializers
from core.models import Training, TrainingRegistration
from core.serializers.skills import SkillSerializer


class TrainingSerializer(serializers.ModelSerializer):
    prerequisite_skills = serializers.SerializerMethodField()
    acquired_skills = serializers.SerializerMethodField()

    class Meta:
        model = Training
        fields = '__all__'
    
    def get_prerequisite_skills(self, training):
        skills = training.prerequisite_skills.filter(is_deleted=False)
        return [SkillSerializer(skill).data for skill in skills]
    
    def get_acquired_skills(self, training):
        skills = training.acquired_skills.filter(is_deleted=False)
        return [SkillSerializer(skill).data for skill in skills]

class TrainingRegistrationSerializer(serializers.ModelSerializer):
    training = TrainingSerializer()

    class Meta:
        model = TrainingRegistration
        fields = '__all__'

class ManagerTrainingRegistrationSerializer(serializers.ModelSerializer):
    training = TrainingSerializer()
    owner = serializers.SerializerMethodField()
    
    def get_owner(self, training_registration):
        return {
            "id": training_registration.owner.id,
            "firstname": training_registration.owner.firstname,
            "lastname": training_registration.owner.lastname,
            "email": training_registration.owner.email,
        }
    
    class Meta:
        model = TrainingRegistration
        fields = '__all__'