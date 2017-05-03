/**
 * Created by Administrator on 2016/10/17 0017.
 * 系统参数配置
 */

/**
 * 游客能浏览的页面
 */
exports.isVisitStat = function(url) {
    var enurl = url ;
    if(url.indexOf("?") != -1) {
        enurl = url.substring(0,url.indexOf("?"));
    }
    var filter = ["/app/user"];  //游客不能浏览的页面
    for(var i=0 ; i<filter.length ; i++){
        if(enurl == filter[i]){
            return true ;
        }
    }
    return false;
};

/**
 * 拦截白名单
 * @param url
 * @returns {boolean}
 */
exports.isWhiteList = function(url) {
    var enurl = url;
    if(url.indexOf("?") != -1) {
        enurl = url.substring(0,url.indexOf("?"));
    }
    var filter = ["/app/user",'/web/login'] ;
    for(var i=0;i<filter.length;i++) {
        if(enurl != filter[i]) {
            return true;
        }
    }
    return false;
};

exports.isApp = function(url) {
    var enurl = url ;
    if(url.indexOf("?") != -1){
        enurl = url.substring(0,url.indexOf("?"));
    }
    var filter = ["/app/user"] ;
    for(var i=0 ; i<filter.length ; i++){
        if(enurl == filter[i]){
            return true ;
        }
    }
    return false ;
};

exports.isWeb = function(url) {
    var enurl = url ;
    if(url.indexOf("?") != -1){
        enurl = url.substring(0,url.indexOf("?"));
    }
    var filter = ['/web/login'] ;
    for(var i=0 ; i<filter.length ; i++){
        if(enurl != filter[i]){
            return true ;
        }
    }
    return false ;
}