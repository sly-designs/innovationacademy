from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import KidSerializer
from .models import Kid

# Create your views here.


class KidViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = KidSerializer

    def get_queryset(self):
        return self.request.user.kids.all()

    def perform_create(self, serializer):
        serializer.save(parent_id=self.request.user)
