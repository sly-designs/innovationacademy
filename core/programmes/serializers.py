from rest_framework import serializers
from programmes.models import Programme, Cohort


class ProgrammeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programme
        fields = "__all__"


class CohortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cohort
        fields = "__all__"
        read_only_fields = ['programme_id']
