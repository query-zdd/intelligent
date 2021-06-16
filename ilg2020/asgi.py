# import os
#
# import django
# from channels.auth import AuthMiddlewareStack
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.http import AsgiHandler
# from channels.routing import ProtocolTypeRouter
# import ilgapps.webapp.routing
#
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ilg2020.settings')
# django.setup()
#
# application = ProtocolTypeRouter({
#   "http": AsgiHandler(),
#   # Just HTTP for now. (We can add other protocols later.)
#   "websocket": AuthMiddlewareStack(
#       URLRouter(
#           ilgapps.webapp.routing.websocket_urlpatterns
#       )
#   ),
# })
"""
ASGI config for untitled1 project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/asgi/
"""

import os
import django

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

import ilgapps.webapp.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ilg2020.settings')
django.setup()

application = ProtocolTypeRouter({
  "http": get_asgi_application(),
  "websocket": AuthMiddlewareStack(
        URLRouter(
            ilgapps.webapp.routing.websocket_urlpatterns
        )
    ),
})


