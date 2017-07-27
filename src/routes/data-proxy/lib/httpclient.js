/**
 * Http代理层，以RESTful方式发起请求，并按客户端要求，处理服务器返回的结果
 */
var http = require('http');
var httpconf = require('./httpconf');
//var Result = require('./result');
var qs = require('querystring');
////前端开发时的url模拟数据映射
//var urlmap = require('../../../dev/urlmap');
//默认配置
var options = {
    host: httpconf.host,
    port: httpconf.port || "",
    path: httpconf.root,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
};
function handleInDevmode(req, res, opt) {
    if (opt.url == null || opt.url == undefined) {
        res.status(500).send("fatal error : url is not defined in the data-request");
    }
    var data = urlmap[opt.url];
    //var data = require(datafile);
    var success = opt.success;
    if (success) {
        success(res, JSON.stringify(data));
    } else {
        res.status(200).send(JSON.stringify(data));
    }
}


/**
 * 设置相对路径，参数和http方法，从数据服务层取数据,并直接发送到客户端
 * @param req
 * @param res
 * @param opt
 */
exports.handle = function (req, res, opt) {
    //开发模式下的数据处理
    if (httpconf.devmode) {
        handleInDevmode(req, res, opt);
        return;
    }
    if (opt.url == null || opt.url == undefined) {
        res.status(500).send("fatal error : url is not defined in the data-request");
    }
    var root = opt.root || httpconf.root;
    options.path = root + opt.url;
    options.method = opt.method || "POST";
    //console.log(req);
    if (opt.params) {
        opt.params.sessionid = req.cookies ? req.cookies.sessionid : '';
        //opt.params.host = req.hostname;
    } else {
        opt.params = {};
        opt.params.sessionid = req.cookies ? req.cookies.sessionid : '';
        //opt.params.host = req.hostname;
    }
    //callback defined
    var success = opt.success;
    var error = opt.error;
    var httpclientError = opt.httpclientError;

    //request defined
    var request = http.request(options, function (feedback) {
        if (feedback.statusCode == 200) {
            var body = "";
            feedback.setEncoding('utf8');
            feedback.on('data', function (chunk) {
                //console.log('BODY: ' + chunk);
                body += chunk;
            }).on('end', function () {
                //callback
                if (success) {
                    success(res, body);
                } else {
                    res.status(200).send(body);
                }
            });
        } else {
            if (error) {
                error(res);
            } else {
                res.status(500).send("error caught in the data response which status-code is 500!");
            }
        }
    }).on('error', function (e) {
        console.log('problem with request: ' + e.message);
        request.end();
        if (httpclientError) {
            httpclientError(res);
        } else {
            res.status(500).send("error occurred with request: " + e.message);
        }

    });

    // write data to request body
    if (opt.params) {
        request.write(qs.stringify(opt.params));
    }
    request.end();
};

