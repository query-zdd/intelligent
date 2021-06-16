from django.conf.urls import include, url
from ilgapps.webapp import views

urlpatterns = [

     url(r'^showAdmin/$', views.showAdmin),
     url(r'^showOrderPay/$', views.showOrderPay),
     url(r'^api/editData/$', views.editData),
     url(r'^api/getPayResult/$', views.getPayResult),
]