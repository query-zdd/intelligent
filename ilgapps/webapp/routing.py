from django.urls import re_path ,path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/ilgVideo/$', consumers.VideoConsumer.as_asgi()),
    # re_path(r'ws/ilgVideoZ/(?P<video_name>\w+)/$', consumers.Tuisong.as_asgi()),
]