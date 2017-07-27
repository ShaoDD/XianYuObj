/**
 * API URL
 */
var urls = {} ;

/*********************API*******************/
urls["testContent"] = "/Test/testpost" ;//测试接口
urls["CNodeTopics"] = "/v1/topics" ;

function geturl(url) {
    return urls[url] ? urls[url] : "";
}

exports.geturl = geturl;