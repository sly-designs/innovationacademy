from rest_framework import routers
from .views import KidViewSet

router = routers.DefaultRouter()
router.register(r"api/kids", KidViewSet, 'kids')

urlpatterns = router.urls
