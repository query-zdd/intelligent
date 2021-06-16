from django.conf.urls import include, url
from ilgapps.alipay import views

urlpatterns = [

     # url(r'^upgrade/(?P<acc_type>\w+)/$', views.upgrade_account),
     url(r'^notify_url/$', views.notify_url_handler),
     url(r'^paysuccess/$', views.payment_success),
     url(r'^payerror/$', views.payment_error),


]