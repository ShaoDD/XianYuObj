/**
 * Created by WinterKiSS on 2016/9/10.
 */
/**
 * API URL
 */
var urls = {};

/*********************API*******************/
urls["testContent"] = "/Test/testpost";//测试接口
urls["CNODETEST"] = "/topics";

function geturl(url) {
    return urls[url] ? urls[url] : "";
}

exports.geturl = geturl;