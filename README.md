# 阿里大鱼nodejs版SDK

## 安装

````
npm install --save alidayu-node
````

## 使用方法
````
var App = require('alidayu-node');
var app = new App('App Key', 'App Secret');

app.smsSend({
    sms_free_sign_name: '注册验证',
    sms_param: {"code": "123456", "product": "测试网站"},
    rec_num: '13599999999',
    sms_template_code: 'SMS_640004'
});
````


## 方法列表

### 短信发送

> smsSend(params, callback)

- `params`
  - `{string} sms_free_sign_name` 短信签名 传入的短信签名必须是在阿里大鱼“管理中心-短信签名管理”中的可用签名。
  - `{json} sms_param` 短信模板变量 传参规则{"key":"value"}，key的名字须和申请模板中的变量名一致，多个变量之间以逗号隔开
  - `{string} rec_num` 短信接收号码 支持单个或多个手机号码，传入号码为11位手机号码，不能加0或+86。群发短信需传入多个号码，以英文逗号分隔，一次调用最多传入200个号码
  - `{string} sms_template_code` 短信模板ID 传入的模板必须是在阿里大鱼“管理中心-短信模板管理”中的可用模板。示例：SMS_585014
- `callback` 回调，参考 http://open.taobao.com/doc2/apiDetail.htm?apiId=25450

### 短信发送记录查询

> smsQuery(params, callback)

- `params`
  - `{string} rec_num` 短信接收号码
  - `{string} query_date` 短信发送日期，支持近30天记录查询，格式yyyyMMdd
  - `{number} current_page` 分页参数,页码
  - `{number} page_size` 分页参数，每页数量。最大值100
- `callback` 回调，参考 http://open.taobao.com/doc2/apiDetail.htm?apiId=26039

### 语音通知

> voiceSinglecall(params, callback)

- `params`
  - `{string} called_num` 被叫号码，支持国内手机号与固话号码,格式如下057188773344,13911112222,4001112222,95500
  - `{string} called_show_num` 被叫号显，传入的显示号码必须是阿里大鱼“管理中心-号码管理”中申请通过的号码
  - `{string} voice_code` 语音文件ID，传入的语音文件必须是在阿里大鱼“管理中心-语音文件管理”中的可用语音文件
- `callback` 回调，参考 http://open.taobao.com/doc2/apiDetail.htm?apiId=25445

### 文本转语音通知

> ttsSinglecall(params, callback)

- `params`
  - `{json} tts_param` 文本转语音（TTS）模板变量，传参规则{"key"："value"}，key的名字须和TTS模板中的变量名一致，多个变量之间以逗号隔开
  - `{string} called_num` 被叫号码，支持国内手机号与固话号码,格式如下057188773344,13911112222,4001112222,95500
  - `{string} called_show_num` 被叫号显，传入的显示号码必须是阿里大鱼“管理中心-号码管理”中申请或购买的号码
  - `{string} tts_code` TTS模板ID，传入的模板必须是在阿里大鱼“管理中心-语音TTS模板管理”中的可用模板
- `callback` 回调，参考 http://open.taobao.com/doc2/apiDetail.htm?apiId=25444

### 语音双呼

> voiceDoublecall(params, callback)

- `params`
  - `{string} caller_num` 主叫号码，支持国内手机号与固话号码,格式如下057188773344,13911112222,4001112222,95500
  - `{string} caller_show_num` 主叫号码侧的号码显示，传入的显示号码必须是阿里大鱼“管理中心-号码管理”中申请通过的号码。显示号码格式如下057188773344，4001112222，95500
  - `{string} called_num` 被叫号码，支持国内手机号与固话号码,格式如下057188773344,13911112222,4001112222,95500
  - `{string} called_show_num` 被叫号码侧的号码显示，传入的显示号码可以是阿里大鱼“管理中心-号码管理”中申请通过的号码。显示号码格式如下057188773344，4001112222，95500。显示号码也可以为主叫号码。
- `callback` 回调，参考 http://open.taobao.com/doc2/apiDetail.htm?apiId=25443

## 更新日志

### 1.0.2
- 修复当参数类型为object时报签名错误的问题