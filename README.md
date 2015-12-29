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
    sms_param: JSON.stringify({"code": "123456", "product": "测试网站"}),
    rec_num: '13599999999',
    sms_template_code: 'SMS_640004'
});
````

## 测试

````
npm test
````