# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Banner(models.Model):
    description = models.CharField(max_length=255, blank=True, null=True)
    pic = models.CharField(max_length=255, blank=True, null=True)
    to_url = models.CharField(max_length=255, blank=True, null=True)
    position = models.CharField(max_length=255, blank=True, null=True)
    is_valid = models.IntegerField(blank=True, null=True)
    goods = models.CharField(max_length=255, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    use_time = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'banner'


class Config(models.Model):
    id = models.IntegerField(primary_key=True)
    c_start_push_flag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'config'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Goods(models.Model):
    goods_id = models.AutoField(primary_key=True)
    goods_img = models.CharField(max_length=255, blank=True, null=True)
    goods_name = models.CharField(max_length=255, blank=True, null=True)
    goods_content = models.TextField(blank=True, null=True)
    goods_info = models.TextField(blank=True, null=True)
    goods_sn = models.CharField(max_length=45, blank=True, null=True)
    goods_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    is_del = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'goods'


class GoodsFeature(models.Model):
    goods_name = models.CharField(max_length=255, blank=True, null=True)
    goods_img = models.CharField(max_length=255, blank=True, null=True)
    goods_content = models.TextField(blank=True, null=True)
    goods_info = models.TextField(blank=True, null=True)
    goods_lable = models.IntegerField(blank=True, null=True)
    goods_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    goods_feature_url = models.CharField(max_length=255, blank=True, null=True)
    is_del = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'goods_feature'


class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    order_sn = models.CharField(max_length=45, blank=True, null=True)
    status = models.CharField(max_length=45, blank=True, null=True)
    create_time = models.DateTimeField(blank=True, null=True)
    order_type = models.CharField(max_length=45, blank=True, null=True)
    merchant_id = models.IntegerField(blank=True, null=True)
    merchant_name = models.CharField(max_length=45, blank=True, null=True)
    member_id = models.IntegerField(blank=True, null=True)
    member_name = models.CharField(max_length=45, blank=True, null=True)
    pay_time = models.DateTimeField(blank=True, null=True)
    goods_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    order_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    order_img = models.CharField(max_length=255, blank=True, null=True)
    goods_name_all = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'order'


class OrderLine(models.Model):
    order_line_id = models.AutoField(primary_key=True)
    order_id = models.IntegerField(blank=True, null=True)
    goods_id = models.IntegerField(blank=True, null=True)
    goods_name = models.CharField(max_length=45, blank=True, null=True)
    goods_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    goods_number = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'order_line'


class Person(models.Model):
    person_id = models.AutoField(primary_key=True)
    member_name = models.CharField(max_length=255, blank=True, null=True)
    card = models.CharField(max_length=255, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    image = models.CharField(max_length=255, blank=True, null=True)
    is_del = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'person'


class SysUser(models.Model):
    sysuser_id = models.AutoField(primary_key=True)
    login_name = models.CharField(max_length=255)
    user_role = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    emailrestkey = models.CharField(max_length=255, blank=True, null=True)
    app_key = models.CharField(max_length=255, blank=True, null=True)
    app_secret = models.CharField(max_length=255, blank=True, null=True)
    tokentime = models.DateTimeField(blank=True, null=True)
    tokenmac = models.CharField(max_length=255, blank=True, null=True)
    tokenipadd = models.CharField(max_length=255, blank=True, null=True)
    token_value = models.CharField(max_length=255, blank=True, null=True)
    create_time = models.DateTimeField(blank=True, null=True)
    is_del = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sys_user'
