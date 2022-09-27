from django.urls import path
from . import views

app_name = 'blog'
urlpatterns = [
    path('janken', views.index),
    path('ajax-janken/', views.ajax_janken, name='ajax_janken'),

]
