#_*_ coding:utf-8 _*_
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_PATH = os.path.dirname(os.path.abspath(os.path.dirname(__file__)))# 获取当前程序的绝对路径
MEDIA_ROOT = os.path.join(PROJECT_PATH, 'ilgapps/upload/').replace('\\', '/')
LOG_ROOT = os.path.join(PROJECT_PATH, 'ilgapps/log/').replace('\\', '/')
SSD_ROOT = os.path.join(PROJECT_PATH, 'ilgapps/SSD/').replace('\\', '/')
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(PROJECT_PATH, 'ilgapps/static/').replace('\\', '/')
MEDIA_URL = '/upload/'

SECRET_KEY = 'x!m)-p#=*!c%l5t*^cnawyzdb=28vdtjj&5mbq%#tt*$q8a)pf'

DEBUG = True
DOMAIN_URL = 'https://spjs.iict.ac.cn/'
ALLOWED_HOSTS = ['127.0.0.1','39.99.188.227','spjs.iict.ac.cn']
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',  # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'ilg2020',  # Or path to database file if using sqlite3.
        # The following settings are not used with sqlite3:
        'USER': 'root',
        # 'PASSWORD': "admin123",      # 'HOST': '121.199.4.22',  # Empty for localhost through domain sockets or '127.0.0.1' for localhost through TCP.
        'PASSWORD': "Zkx191030",
        'HOST': '39.99.188.227',  # Empty for localhost through domain sockets or '127.0.0.1' for localhost through TCP.
        # 'HOST':'127.0.0.1',
        'PORT': '3306',  # Set to empty string for default.

    }
}

# Application definition

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'ilgapps',
    'channels',
)

ASGI_APPLICATION = 'ilg2020.asgi.application'
#
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}


MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'ilgapps.middleware.AdminMiddleware'
)
MIDDLEWARE = (
    'django.contrib.sessions.middleware.SessionMiddleware',
)


ROOT_URLCONF = 'ilg2020.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,

        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ilg2020.wsgi.application'


LANGUAGE_CODE = 'zh-hans'

TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

USE_TZ = False



# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.8/howto/static-files/
# PROJECT_PATH = os.path.dirname(os.path.abspath(os.path.dirname(__file__)))# 获取当前程序的绝对路径

