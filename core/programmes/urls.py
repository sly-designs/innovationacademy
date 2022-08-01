from rest_framework import routers
from .views import CohortViewSet, ProgrammeViewSet

router = routers.DefaultRouter()
router.register(r'api/programmes', ProgrammeViewSet, "programmes")
router.register(r'api/cohorts', CohortViewSet, "cohorts")

urlpatterns = router.urls
