var request = require('request');
var crypto = require('crypto');
var _ = require('lodash');
var moment = require('moment');
function App(key, secret) {
    this.url = 'http://gw.api.taobao.com/router/rest';
    this.appKey = key;
    this.appSecret = secret;
    this.config = {
        method: '',
        format: 'json',
        v: '2.0',
        sign_method: 'md5',
        app_key: key,
    };
}

//签名
/**
 * 签名
 * @param {object} params 参数
 * @returns {object} 返回合并后的参数对象，增加params.sign
 **/
App.prototype.sign = function(params) {
    var params = _.merge({}, this.config, params);
    params.timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
    var str = [this.appSecret];
    Object.keys(params).sort().forEach(function(key) {
        var val = params[key];
        if (typeof val === 'object') {
            val = JSON.stringify(val);
            params[key] = val;
        }
        str.push(key + val);
    });
    str.push(this.appSecret);
    str = str.join('');
    params.sign = crypto.createHash('md5').update(str, 'utf-8').digest('hex').toUpperCase();
    return params;
}

/**
 * 请求mtop服务
 * @param {object} params 参数
 * @param {funciton} callback 回调
 * @returns {undefined}
 **/
App.prototype.request = function(params, callback) {
    var params = this.sign(params);
    var postData = {
	    url: this.url,
	    form: params,
	    json: true,
	    headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            'app_key': this.appKey,
        },
    };
    request.post(postData, function(err, res, body) {
        callback && callback.call(null, body);
    })
}

/**
 * 短信发送
 * @param {object} params 参数
 - params
     @param {string} sms_type 短信类型 normal
     @param {string} sms_free_sign_name 短信签名 传入的短信签名必须是在阿里大鱼“管理中心-短信签名管理”中的可用签名。
     @param {json} sms_param 短信模板变量 传参规则{"key":"value"}，key的名字须和申请模板中的变量名一致，多个变量之间以逗号隔开
     @param {string} rec_num 短信接收号码 支持单个或多个手机号码，传入号码为11位手机号码，不能加0或+86。群发短信需传入多个号码，以英文逗号分隔，一次调用最多传入200个号码
     @param {string} sms_template_code 短信模板ID 传入的模板必须是在阿里大鱼“管理中心-短信模板管理”中的可用模板。示例：SMS_585014
 * @param {function} callback 回调
 * @returns {undefined}
 **/
App.prototype.smsSend = function(params, callback) {
    var defaults = {
        method: 'alibaba.aliqin.fc.sms.num.send',
        sms_type: 'normal'
    }
    this.request(_.merge(defaults, params), callback);
}

// 短信发送记录查询
/**
 * 短信发送记录查询
 * @param {object} params 参数
 - params
     @param {string} rec_num 短信接收号码
     @param {string} query_date 短信发送日期，支持近30天记录查询，格式yyyyMMdd
     @param {number} current_page 分页参数,页码
     @param {number} page_size 分页参数，每页数量。最大值100
 * @param {function} callback 回调
 * @returns {undefined}
 **/
App.prototype.smsQuery = function(params, callback) {
    var defaults = {
        method: 'alibaba.aliqin.fc.sms.num.query'
    }
    this.request(_.merge(defaults, params), callback);
}

// 语音通知
/**
 * 语音通知
 * @param {object} params 参数
 - params
     @param {string} called_num 被叫号码，支持国内手机号与固话号码,格式如下057188773344,13911112222,4001112222,95500
     @param {string} called_show_num 被叫号显，传入的显示号码必须是阿里大鱼“管理中心-号码管理”中申请通过的号码
     @param {string} voice_code 语音文件ID，传入的语音文件必须是在阿里大鱼“管理中心-语音文件管理”中的可用语音文件
 * @param {function} callback 回调
 * @returns {undefined}
 **/
App.prototype.voiceSinglecall = function(params, callback) {
    var defaults = {
        method: 'alibaba.aliqin.fc.voice.num.singlecall'
    }
    this.request(_.merge(defaults, params), callback);
}

// 文本转语音通知
/**
 * 文本转语音通知
 * @param {object} params 参数
 - params
     @param {json} tts_param 文本转语音（TTS）模板变量，传参规则{"key"："value"}，key的名字须和TTS模板中的变量名一致，多个变量之间以逗号隔开
     @param {string} called_num 被叫号码，支持国内手机号与固话号码,格式如下057188773344,13911112222,4001112222,95500
     @param {string} called_show_num 被叫号显，传入的显示号码必须是阿里大鱼“管理中心-号码管理”中申请或购买的号码
     @param {string} tts_code TTS模板ID，传入的模板必须是在阿里大鱼“管理中心-语音TTS模板管理”中的可用模板
 * @param {function} callback 回调
 * @returns {undefined}
 **/
App.prototype.ttsSinglecall = function(params, callback) {
    var defaults = {
        method: 'alibaba.aliqin.fc.tts.num.singlecall'
    }
    this.request(_.merge(defaults, params), callback);
}

/**
 * 语音双呼
 * @param {object} params 参数
 - params
     @param {string} caller_num 主叫号码，支持国内手机号与固话号码,格式如下057188773344,13911112222,4001112222,95500
     @param {string} caller_show_num 主叫号码侧的号码显示，传入的显示号码必须是阿里大鱼“管理中心-号码管理”中申请通过的号码。显示号码格式如下057188773344，4001112222，95500
     @param {string} called_num 被叫号码，支持国内手机号与固话号码,格式如下057188773344,13911112222,4001112222,95500
     @param {string} called_show_num 被叫号码侧的号码显示，传入的显示号码可以是阿里大鱼“管理中心-号码管理”中申请通过的号码。显示号码格式如下057188773344，4001112222，95500。显示号码也可以为主叫号码。
 * @param {function} callback 回调
 * @returns {undefined}
 **/
App.prototype.voiceDoublecall = function(params, callback) {
    var defaults = {
        method: 'alibaba.aliqin.fc.voice.num.doublecall'
    }
    this.request(_.merge(defaults, params), callback);
}

module.exports = App;