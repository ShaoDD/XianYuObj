var Action = require('../apiaction');
var base64 = require('base64url');
var md5 = require('md5');
var sqloperate = require('../SQL_interface/SQL_operate');
var URL = require('url');

var User = require('./User');

exports.APIServer = function (router) {
    router.get('/api', function (req, res) {
        res.send('API Server');
    });

    router.get('/api/getUserInfo', function(req, res) {
        var user = new User();
        var params = URL.parse(req.url, true).query;
        if(params.id == '1') {
            user.name = "ligh";
            user.age = "1";
            user.city = "北京市";
        }else{
            user.name = "SPTING";
            user.age = "1";
            user.city = "杭州市";
        }
        var response = {status:1,data:user};
        res.send(JSON.stringify(response));

    });
};