#!/usr/bin/env bash

echo "admin123" | sudo -S /etc/init.d/redis-server start

/home/zdd/anaconda3/envs/env_zdd/bin/python manage.py runserver 8000 &

if [ $? -ne 0 ];then
    echo "faild"
else
    echo "success"
fi


sleep 10

/home/zdd/anaconda3/envs/env_zdd/bin/python /home/msh/PycharmProjects/gitlab/intelligent/ilgapps/webapp/test.py

