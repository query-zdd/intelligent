# -*- coding: utf-8 -*-
import os
import traceback

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import  render
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import uuid
from django.utils.encoding import smart_str
from ilgapps.models import *
from django.contrib.auth.hashers import make_password, check_password
from django.core.mail import EmailMultiAlternatives
from datetime import *
import string,random
@csrf_exempt
def personalin(request):
    if request.method == 'POST':
        loginname = request.POST.get('username')
        psw = request.POST.get('password')
        srcurl = request.POST.get('srcurl')
        if srcurl == '':
            srcurl = '/offer/showOfferSample/'
        if loginname == None:
            loginname = ""
        if psw == None:
            psw = ""
        sysuser = SysUser.objects.filter(login_name=loginname.upper(),
                                         password=psw).exclude(is_del=1)
        if sysuser and sysuser.count() > 0 :
            request.session['sysuser_id'] = sysuser[0].sysuser_id
            response = HttpResponseRedirect(srcurl)
            response.set_cookie('sysuser_id', sysuser[0].sysuser_id, max_age=12000)
            response.set_cookie('staff_name', sysuser[0].login_name, max_age=12000)
            return response
        else:
            return render(request, 'authen/adminLogin.html', {'showError': "", "srcurl": srcurl})
    else:
        srcurl = request.GET.get('srcurl')
        if srcurl != None:
            return render(request, 'authen/adminLogin.html', {'showError': "hide", "srcurl": srcurl})
        else:
            return render(request, 'authen/adminLogin.html', {'showError': "hide"})


def personalout(request):
    response = HttpResponseRedirect('/admin/')
    response.delete_cookie('sysuser_id')
    response.delete_cookie('staff_name')
    if request.session.get('sysuser_id'):
        del request.session['sysuser_id']
    return response
