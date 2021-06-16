from django.http import HttpResponse, HttpResponseRedirect
class AdminMiddleware(object):
    ADMIN_URL = [
        '/offer/',
        '/category/',
        '/account/'
    ]
    EXCEPT_URL = [
        '/offer/offerExportShow/',
        '/offer/offerExportShowTc/'
    ]
    def process_request(self, request):
        if any(map(lambda x:request.path.startswith(x),AdminMiddleware.ADMIN_URL))\
                and all(map(lambda x:not request.path.startswith(x),AdminMiddleware.EXCEPT_URL)):
            if not 'sysuser_id' in request.session:
                response = HttpResponseRedirect('/admin/?srcurl=' + request.path)
                return response

    # def process_exception(self, request, exception):
    #     return HttpResponseRedirect('/')

