"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from core import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register(r'employees', views.EmployeeView, 'employee')
router.register(r'managers', views.ActiveEmployeeView, 'manager')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', views.MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path("auth/logout/", views.LogoutView.as_view()),
    path("api/holiday_create/", views.CrudHolidaysRequestView.as_view()),
    path("api/holiday_validate/", views.ValidateHolidaysRequestView.as_view()),
    path("api/team/", views.CrudTeamView.as_view()),
    path("api/teams/", views.ListTeamView.as_view()),
    path("api/team_holidays_requests/", views.TeamHolidaysRequestView.as_view()),
    path("api/vacation_type/", views.CrudVacationTypesView.as_view()),
    path("api/notifications/", views.NotificationFrontEndView.as_view()),
    path("api/skills/", views.SkillView.as_view()),
    path("api/skills_list/", views.ListSkillView.as_view()),
]
