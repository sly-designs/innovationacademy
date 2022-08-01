from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, serializers, permissions
from kids.models import Kid
from .serializers import KidSerializer


""" class KidViews(APIView):
    def post(self, request):
        serializer = KidSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id=None):
        if id:
            kid = Kid.objects.get(id=id)
            serializer = KidSerializer(kid)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

        kids = Kid.objects.all()
        serializer = KidSerializer(kids, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK) """


@api_view(['GET'])
def ApiOverview(request):
    api_urls = {
        "all_kids": "/kids/all_kids",
        "add_kid": "/kids/add_kid",
        "view_kid": "/kids/view_kid/<str:pk>/",
        "update_kid": "/kids/update_kid/<str:pk>/",
        "Delete": "/kids/pk/del_kid/<str:pk>/"
    }

    return Response(api_urls)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def addKid(request):
    serializer = KidSerializer(data=request.data)

    if Kid.objects.filter(**request.data).exists():
        raise serializers.ValidationError('This data already exists')
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def updateKid(request, pk):
    kid = Kid.objects.get(id=pk)

    serializer = KidSerializer(instance=kid, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getKid(request, pk):

    kid = Kid.objects.get(id=pk)

    if kid:
        serializer = KidSerializer(kid, many=False)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def getKids(request):

    kids = Kid.objects.all()

    if kids:
        serializer = KidSerializer(kids, many=True)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
