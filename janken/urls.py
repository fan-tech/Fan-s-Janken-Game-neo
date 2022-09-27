from . import views
from django.urls import path, include


urlpatterns = [
    path('janken', views.index),
    path('ajax-janken/', views.ajax_janken, name='ajax_janken'),
]
