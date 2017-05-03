/**
 * Created by WinterKiSS on 2016/9/12.
 */
var Action          = require('../../routes/apiaction');
var base64          = require('base64url');
var md5             = require('md5');
var sqloperate      = require('../../routes/SQL_interface/SQL_operate');

exports.appAPI = function(router){
    router.get("/api/sql/test",function(req,res){
        var db = 'detail_list';
        var con = '';
        sqloperate.selectSQL(db,con,res);
    })
};