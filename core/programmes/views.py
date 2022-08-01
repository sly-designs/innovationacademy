from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ProgrammeSerializer, CohortSerializer
from .models import Programme, Cohort
# Create your views here.


class ProgrammeViewSet(viewsets.ModelViewSet):
    serializer_class = ProgrammeSerializer

    queryset = Programme.objects.all()


class CohortViewSet(viewsets.ModelViewSet):
    serializer_class = CohortSerializer
    queryset = Cohort.objects.all()
