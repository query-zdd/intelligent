"""ilg2020 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.conf import settings
# from django.contrib import admin
from ilgapps.authen.views import *
from ilgapps.utils import getModuleAccess
from ilgapps.utils import upload_file
from django.views.static import serve
urlpatterns = [
    # url(r'^admin/', include(admin.site.urls)),
     url(r'^offer/', include('ilgapps.offer.urls')),
     url(r'^webapp/', include('ilgapps.webapp.urls')),
     url(r'^$', personalin, name='personalin'),
     url(r'^admin/', personalin, name='personalin'),
     url(r'^personalout/', personalout, name='personalout'),
     # 支付宝 支付
     url(r'^alipay/', include('ilgapps.alipay.urls')),
     url(r'^utils/api/getModuleAccess/$', getModuleAccess, name='getModuleAccess'),
     url(r'^upload/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
     url(r'^utils/api/upload_file/$', upload_file, name='upload_file'),

]
