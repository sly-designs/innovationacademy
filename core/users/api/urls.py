from django.urls import path
from .views import ParentSignupView, AdminSignupView, CustomAuthToken, LogoutView, AdminOnlyView, ParentOnlyView

urlpatterns = [
    path('signup/parent/', ParentSignupView.as_view()),
    path('signup/admin/', AdminSignupView.as_view()),
    path('login/', CustomAuthToken.as_view(), name='auth-token'),
    path('logout/', LogoutView.as_view(), name='logout-view'),
    path('parent/dashboard/', ParentOnlyView.as_view(), name='parent-dashboard'),
    path('admin/dashboard/', AdminOnlyView.as_view(), name='admin-dashboard')
]
