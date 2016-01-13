var expect = require('chai').expect;
var moment = require('moment');

var App = require('../index');
var app = new App('', '');

var testObj = {
    phone: ''
};

describe('#短信发送', function() {
    it('当参数都正确应该返回成功数据', function(done) {
        app.smsSend({
            sms_free_sign_name: '注册验证',
            sms_param: {"code": "123456", "product": "测试网站"},
            rec_num: testObj.phone,
            sms_template_code: 'SMS_640004'
        }, function(res) {
            //console.log(res)
            if (expect(res).to.have.property('alibaba_aliqin_fc_sms_num_send_response')) {
                done();
            }
        })
    });
    it('没有传手机号时应该返回错误error_response', function(done) {
        app.smsSend({
            sms_free_sign_name: '注册验证',
            sms_param: {"code": "123456", "product": "测试网站"},
            //rec_num: testObj.phone,
            sms_template_code: 'SMS_640004'
        }, function(res) {
            if (expect(res).to.have.property('error_response')) {
                done();
            }
        })
    });
});
describe('#短信发送记录查询', function() {
    it('当参数都正确应该返回成功数据', function(done) {
        app.smsQuery({
            rec_num: testObj.phone,
            query_date: moment().format('YYYYMMDD'),
            current_page: 1,
            page_size: 20
        }, function(res) {
            if (expect(res).to.have.property('alibaba_aliqin_fc_sms_num_query_response')) {
                done();
            }
        })
    });
    it('没有传手机号时应该返回错误error_response', function(done) {
        app.smsQuery({
            //rec_num: testObj.phone,
            query_date: moment().format('YYYYMMDD'),
            current_page: 1,
            page_size: 20
        }, function(res) {
            if (expect(res).to.have.property('error_response')) {
                done();
            }
        })
    });
});
