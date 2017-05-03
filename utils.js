/**
 * Created by Administrator on 2016/10/17 0017.
 */
var os = require('os');

/**
 * 获取IP
 * @param req
 * @returns {*}
 */
exports.getClientIP = function(req){
    var ipAdress ;
    var headers = req.headers ;
    var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'] ;
    forwardedIpsStr ? ipAdress = forwardedIpsStr : ipAdress = null ;
    if (!ipAdress) {
        ipAdress = req.connecting.remoteAddress;
    }
    return ipAdress
};

/**
 * 格式化参数
 * @param args
 * @returns {string}
 */
exports.params = function(args){
    var keys = Object.keys(args) ;
    keys = keys.sort();
    var newArgs = {};
    keys.forEach(function(key){
        newArgs[key.toLowerCase()] = args[key] ;
    });

    var string = '' ;
    for(var k in newArgs){
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string
};

/**
 * 移动终端、浏览器版本判定信息
 * @param agent
 * @returns {{}}
 */
exports.brows = function(agent){
    return {
        trident: agent.indexOf('Trident') > -1, //IE内核
        presto: agent.indexOf('Presto') > -1, //opera内核
        webKit: agent.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: agent.indexOf('Gecko') > -1 && agent.indexOf('KHTML') == -1,//火狐内核
        mobile: !!agent.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: agent.indexOf('Android') > -1 || agent.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: agent.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
        iPad: agent.indexOf('iPad') > -1, //是否iPad
        webApp: agent.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: agent.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: agent.match(/\sQQ/i) == " qq" //是否QQ
    }
};