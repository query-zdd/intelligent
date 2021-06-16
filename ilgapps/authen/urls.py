# -*- coding: utf-8 -*-
from django.conf.urls import patterns, url

urlpatterns = patterns('ilgapps.authen.views',
                       url(r'^$', 'personalin', name='personalin'),
                       )
