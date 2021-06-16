# -*- coding: utf-8 -*-
'''
Created on 2011-4-21
支付宝接口
@author: Yefe
'''
import types

def smart_str(s, encoding='utf-8', strings_only=False, errors='strict'):
    """
    Returns a bytestring version of 's', encoded as specified in 'encoding'.

    If strings_only is True, don't convert (some) non-string-like objects.
    """
    if strings_only and isinstance(s, (types.NoneType, int)):
        return s
    if not isinstance(s, basestring):
        try:
            return str(s)
        except UnicodeEncodeError:
            if isinstance(s, Exception):
                # An Exception subclass containing non-ASCII data that doesn't
                # know how to print itself properly. We shouldn't raise a
                # further exception.
                return ' '.join([smart_str(arg, encoding, strings_only,
                                           errors) for arg in s])
            return unicode(s).encode(encoding, errors)
    elif isinstance(s, unicode):
        return s.encode(encoding, errors)
    elif s and encoding != 'utf-8':
        return s.decode('utf-8', errors).encode(encoding, errors)
    else:
        return s


# 网关地址
_GATEWAY = 'https://mapi.alipay.com/gateway.do?'


# 对数组排序并除去数组中的空值和签名参数
# 返回数组和链接串
def params_filter(params):
    ks = params.keys()
    ks.sort()
    newparams = {}
    prestr = ''
    for k in ks:
        v = params[k]
        k = smart_str(k, settings.ALIPAY_INPUT_CHARSET)
        if k not in ('sign', 'sign_type') and v != '':
            newparams[k] = smart_str(v, settings.ALIPAY_INPUT_CHARSET)
            prestr += '%s=%s&' % (k, newparams[k])
    prestr = prestr[:-1]
    return newparams, prestr


# 生成签名结果
def build_mysign(prestr, key, sign_type='RSA2'):
    if sign_type == 'RSA2':
        return md5(prestr + key).hexdigest()
    return ''


def notify_verify(post):
    # 初级验证--签名
    _, prestr = params_filter(post)
    mysign = build_mysign(prestr, settings.ALIPAY_KEY, settings.ALIPAY_SIGN_TYPE)
    k8Logger.info('>> notify_verify:mysign=' + mysign)
    if mysign != post.get('sign'):
        return False
    else:
        return True

