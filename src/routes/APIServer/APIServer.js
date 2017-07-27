const Action = require('../apiaction');
const base64 = require('base64url');
const md5 = require('md5');
const sqloperate = require('../SQL_interface/SQL_operate');
const URL = require('url');

const User = require('./User');

exports.APIServer = function (router) {
    router.get('/api', function (req, res) {
        res.send('API Server');
    });

    router.get('/api/getUserInfo', function(req, res) {
        let user = new User();
        let params = URL.parse(req.url, true).query;
        if(params.id == '1') {
            user.name = "ligh";
            user.age = "1";
            user.city = "北京市";
        }else{
            user.name = "SPTING";
            user.age = "1";
            user.city = "杭州市";
        }
        let response = {status:1,data:user};
        res.send(JSON.stringify(response));

    });
};