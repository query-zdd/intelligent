import sys
sys.path.append("/home/msh/PycharmProjects/gitlab/intelligent")
from ilgapps.webapp.consumers import send_group_msg
import os
import django
from ilgapps.SSD.Demo_detect_video import start_video
from ilgapps.yolov5.detect_syy import detect

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ilg2020.settings')
django.setup()
from ilgapps.MVS import config

def send_info(message):
    test=send_group_msg("member",message)

if __name__=="__main__":
    status=2
    # 1、ssd调用检测方法
    if status==1:
        print("start")
        # message = {'status': 0, 'msg': "start"}
        # send_info(message)
        result = start_video()
        print(result)
        message={'status':1,'msg':result}
        send_info(message)
    if status==2:
        start_push_flag = config.getconfig()
        image = "/home/msh/PycharmProjects/video/333.jpg"
        drawn_image, labels, ilg_time = detect(image)
        result = {}
        result["num"] =  config.setconfig(1)
        result["goods"] = labels
        result['use_time'] = ilg_time
        print(result)

