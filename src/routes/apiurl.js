/**
 * Created by WinterKiSS on 2016/9/10.
 */
/**
 * API URL
 */
var urls = {};

/*********************API*******************/
urls["cnodeTopics"] = "/topics";//主题首页
urls["werewolvesGetRoles"] = "/Do/GetRoles";//获取身份信息

function getUrl(url) {
    return urls[url] ? urls[url] : "";
}

exports.getUrl = getUrl;