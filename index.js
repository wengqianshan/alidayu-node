var request = require('request');
var crypto = require('crypto');
var _ = require('lodash');
var moment = require('moment');
function App(key, secret) {
    this.url = 'http://gw.api.taobao.com/router/rest';
    this.appKey = key;
    this.appSecret = secret;
    var defaults = {
        method: '',
        app_key: '',
        timestamp: '',
        format: 'json',
        v: '2.0',
        sign_method: 'md5'
    };
    this.config = _.merge(defaults, {
        app_key: this.appKey
    });
}

//签名
App.prototype.sign = function(params) {
    var _this = this;
    var params = _.merge(this.config, params);
    params.timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
    var str = [this.appSecret];
    Object.keys(params).sort().forEach(function(key) {
        if (typeof _this.config[key] === 'object') {
            str.push(key + JSON.stringify(_this.config[key]));
        } else {
            str.push(key + _this.config[key]);
        }
        
    });
    str.push(this.appSecret);
    str = str.join('');
    var bufferSize = str.length > 1024 ? str.length : 1024;
    var Buffer = require('buffer').Buffer;
    var buf = new Buffer(bufferSize);
    var len = buf.write(str, 0, bufferSize);
    str = buf.toString('binary', 0, len);
    params.sign = crypto.createHash('md5').update(str).digest('hex').toUpperCase();
    return params;
}

//请求mtop服务
App.prototype.request = function(params, callback) {
    var params = this.sign(params);
    return;
    request({
        url: this.url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            'app_key': this.appKey,
        },
        qs: params,
        json: true
    }, function(err, res, body) {
        callback && callback.call(body);
    })
}

// 发送短信验证码
App.prototype.smsSend = function(params, callback) {
    var defaults = {
        method: 'alibaba.aliqin.fc.sms.num.send',
        sms_type: 'normal'
    }
    this.request(_.merge(defaults, params), callback);
}

module.exports = App;