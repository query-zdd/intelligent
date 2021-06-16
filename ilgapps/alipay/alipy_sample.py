#!/usr/bin/env python

# -* - coding: utf - 8 -* -
import json
import logging

from alipay.aop.api.AlipayClientConfig import AlipayClientConfig

from alipay.aop.api.DefaultAlipayClient import DefaultAlipayClient

from alipay.aop.api.domain.AlipayTradeQueryModel import AlipayTradeQueryModel

from alipay.aop.api.request.AlipayTradeQueryRequest import AlipayTradeQueryRequest



logging.basicConfig(

  level = logging.INFO,

  format = '%(asctime)s %(levelname)s %(message)s',

  filemode = 'a',)

logger = logging.getLogger('')



def getResult(order_sn):

  """ 初始化 """

  alipay_client_config = AlipayClientConfig()



  """ 支付宝网关 """

  alipay_client_config.server_url = 'https://openapi.alipay.com/gateway.do'

  alipay_client_config.app_id = '2021002128659929'

  """ 密钥格式为pkcs1，如何获取应用私钥请参考：https://opensupport.alipay.com/support/helpcenter/207/201602469554 """

  alipay_client_config.app_private_key = 'MIIEpAIBAAKCAQEAodyHssJprfHythlxr03deKyknOjX+69+HIXZVkV5cQCS5O+M6AUVyD3yl7KB5Qxl5P/lhtOLSzq7FzdvjkUX0l87/y9/Z3RoiVT4L+LZ5xYqf3DJFXqzf2YyIr0tlmMxpqqImkMFNRDesEzmf9Orj/YmjMfond3MW5fN340UYMK+SYuKRggev2GM2bKx0tA0Ui0gJdVv6+vHQGEmGBqkWBdD2SDGOwCkUg2wysGEsO13zXLIjPfBIVkZi4myYTqj/4qFr2TeSY4LIPP3e0bQqHcJqmNP86gOu2sNGIKlepyF7n5PWALc7naumJmDQNQEiraCg+JQ4mWEPtClb55ilwIDAQABAoIBAAt/z2Qzy64/8i5dwGXj8kgQe+Fp6W5IGX2NRNOMPAR7NfRt0GTrd5CyVfnRBMlxCAws4fGiNdMyaPhNR++jmP2pJmoKxdJjwsl+7+L3CuQP/xTuvlp4TShP6l/tcL+ubGia1PmgqU4L1MZRsE6Eizu/ER4PVcdhapNXRZkMPNZi4mUPTmrDwlOyQ80epAnTODXrTvigx/5TfODJKdp2NlGBjN5qN/7xyMV5oGh/Or9VLvTSUmgcr0VFsDKZHmaRmJW/OW3fTZZGQ8NzrjrrKIB4l2U8ha8T4cB2XgZHn4ICYg3ztnhZXRsf+EPGf9h7Y2Fv5WMxceCZO5w4+ho9yYECgYEA5DWN5uS4DehBVnXaAZU2TmdL6CYiPx7sHx0/7c12mmxTkKLU+X6FpBzbkkEsFY06Pzl6ISNP0rfZaTSIoFpJiXlNBQrjPWwSsB5D6V1WlWHc1Uvx0zrRo+LJgyJ/sa7VEv/BVuGvHb3hLWLQJPe7/t1v1Lu7MGqhq8thzuqZ9XsCgYEAtZKT4UlwxoiT7Ibms0tHF48x4nL1IsY1lW2S/8oyguYNr7HymFQimqPox1Pwv0YDXrxeTfyeumaWQsxgBpudk4XPlQkx0rPsScLwLr5pcg8enEvA8RZxNBB8rHRhpPiKhkSiVe36mDwuY/knTL89MrenEsfG9T+7QbfMnuuC5pUCgYBioNKnS4pQWGSEnYKO1JIX6ITh3DlI1nBuMhIDEJ2Ft/OVuwoYmhngB6jN2OTYm6Tk1k52K/C/vT11PoMd6meFxqsG1uHHFgIto6buIKze+uCaPqxRAkbAca9twWc2v7zO7UH97qPkUsATAXW7xGW3jLRcWJZaInuk581pw/KuKQKBgQCpIrkOCtM6nM7ubVtJeL3ofEMDpgIjOm9/mmpsS3Vx6cql9yT8MKNrWXPk+ZQxGI7bGKzgCInzKMyfvLFWdm76lJMhSUdX9rIMo8IISOcAkIT7IrW/3h/lV9ZK7r5mZf7jw9tUIDJmzOiJx/WL0Di5ncnL/Lygh5VvSj8ZalitYQKBgQDXY9WPuMvftuyTq7L9NrG6bp1qAi+cKcvEHi2tIVgSw1LyvNFq8Pg1J+ZLN7av61jEgskNoPnswyvGVMODpB96KgcsqZMPgBlqMWZe851UsBYfMvQ2o8X65ikA8J9ZW8RGF9vc7GStsVwpyc4wqMAqbx+orOIHvfvyh9cCUK0H6g=='

  """ 如何获取支付宝公钥请查看：https://opensupport.alipay.com/support/helpcenter/207/201602487431 """

  alipay_client_config.alipay_public_key = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjV42aKuUJTMkMFl8hLyMeVjT+pXYIovJjRkXMztyyHFWs9dkY/bwr56pO+B/audiJSJ3/+LvycTnu2O1iojfDSzGIClwc9OwNwExzypOjaqHN+FvqVvCAU/Ed6SlqUIdh0o+4X0ZrHvU2BvcvDoEvNA/YoqovixMH5/oKxnLoQoP9ChYnWFSnoJSFwbumbuns/Gk6DoY66QkVNoLnJlxU9QM1xlhO0rqmXr7EtRn6gHPgGiKQ4Dmxskuuej801wtC62LjNpYi2dl3cIkTxoimbp5rQIXPhcP3u3F1G9hsvngjSN7DnsNPBlx3BNjqF8d1LRXF3sQcho1Iu+0EW3xZwIDAQAB'

  """ 签名算法类型 """

  alipay_client_config._sign_type = 'RSA2'

  client = DefaultAlipayClient(alipay_client_config, logger)



  """ 构造请求参数对象,当前调用接口名称：alipay.trade.query(统一收单线下交易查询) """

  model = AlipayTradeQueryModel()



  """ 注：交易号（TradeNo）与订单号（OutTradeNo）二选一传入即可，如果2个同时传入，则以交易号为准 """

  """ 支付接口传入的商户订单号。如：2020061601290011200000140004 """

  model.out_trade_no =order_sn;



  """ 异步通知/查询接口返回的支付宝交易号，如：2020061622001473951448314322 """

  # model.trade_no = "2020061622001473951448314322";



  request = AlipayTradeQueryRequest(biz_model = model)



  """ 第三方调用（服务商模式），传值app_auth_token后，会收款至授权token对应商家账号，如何获传值app_auth_token请参考文档：https://opensupport.alipay.com/support/helpcenter/79/201602494631 """

  #request.add_other_text_param('app_auth_token', '传入获取到的app_auth_token值')



  """ 执行API调用 """

  response = client.execute(request)

  data = json.loads(response)

  code = data['code']

  msg = 0

  if code=="10000":
      trade_status = data['trade_status']
      if trade_status =="TRADE_SUCCESS":
          msg = 1


  return msg


