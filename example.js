var App = require('./index.js');
var app = new App('App Key', 'App Secret');

app.smsSend({
    sms_free_sign_name: '注册验证',
    sms_param: JSON.stringify({"code": "123456", "product": "测试网站"}),
    rec_num: '13599999999',
    sms_template_code: 'SMS_640004'
});