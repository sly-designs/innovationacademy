from rest_framework import serializers
from kids.models import Kid


class KidSerializer(serializers.ModelSerializer):

    class Meta:
        model = Kid
        fields = "__all__"
        read_only_fields = ['parent_id']
