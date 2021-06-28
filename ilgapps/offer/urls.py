# _*_ coding:utf-8 _*_
"""mtr2017 URL Configuration

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
from ilgapps.offer import views

urlpatterns = [

     url(r'^showOfferSample/$', views.showOfferSample),
     url(r'^showVideoSample/$', views.showVideoSample),
     url(r'^showOfferEdit/$', views.showOfferEdit),
     url(r'^showOfferOne/$', views.showOfferOne),
     url(r'^api/fileUploadOfferImg/$', views.fileUploadOfferImg),
     url(r'^api/fileUploadOfferVideo/$', views.fileUploadOfferVideo),
     url(r'^api/saveBanner/$', views.saveBanner),
     url(r'^api/BannerOperation/$', views.BannerOperation),
     url(r'^showSearchBanner/$', views.showSearchBanner),
     url(r'^showGoods/$', views.showGoods),
     url(r'^api/saveGoods/$', views.saveGoods),
     url(r'^api/goodsOperation/$', views.goodsOperation),
     url(r'^api/queryGoods/$', views.queryGoods),
     url(r'^showMember/$', views.showMember),
     url(r'^api/saveMember/$', views.saveMember),
     url(r'^api/memberOperation/$', views.memberOperation),
     url(r'^showOrder/$', views.showOrder),
     url(r'^api/saveOrder/$', views.saveOrder),
     url(r'^api/orderOperation/$', views.orderOperation),
     url(r'^showOrderStatistics/$', views.showOrderStatistics),
     url(r'^api/getOrderStatic/$', views.getOrderStatic),
     url(r'^showGoodsStatistics/$', views.showGoodsStatistics),
     url(r'^api/getGoodsStatic/$', views.getGoodsStatic),
     url(r'^showGoodsFeature/$', views.showGoodsFeature),
     url(r'^api/saveGoodsFeature/$', views.saveGoodsFeature),
     url(r'^api/goodsVideoOperation/$', views.goodsVideoOperation),



]