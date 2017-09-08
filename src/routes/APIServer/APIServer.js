var Action = require('../apiaction');
var base64 = require('base64url');
var md5 = require('md5');
var sqloperate = require('../SQL_interface/SQL_operate');
var URL = require('url');

exports.APIServer = function (router) {
    router.get('/api', function (req, res) {
        res.send('API Server');
    });
};