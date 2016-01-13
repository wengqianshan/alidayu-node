var App = require('./index.js');
var app = new App('App Key', 'App Secret');

//发短信
app.smsSend({
    sms_free_sign_name: '注册验证',
    sms_param: {"code": "123456", "product": "测试网站"},
    rec_num: '13888888888',
    sms_template_code: 'SMS_640004'
}, function(res) {
    console.log(res)
});

//查询发送记录
app.smsQuery({
    rec_num: '13888888888',
    query_date: '20151228',
    current_page: 1,
    page_size: 20
}, function(res) {
    console.log(res['alibaba_aliqin_fc_sms_num_query_response'].values)
})