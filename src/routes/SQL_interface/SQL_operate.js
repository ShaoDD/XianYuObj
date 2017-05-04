/**
 * Created by Administrator on 2016/12/28 0028.
 */
//数据库模块
var mysql = require('mysql');
//数据库配置信息
var settings = require('./SQL_setting');
//查询方法
function selectSQL(db, con, res) {
    console.log("进入数据库查询接口");
    var connection = mysql.createConnection(settings.db);
    console.log("开始连接数据库");
    connection.connect();//开始连接
    //语句
    console.log("定义数据库语句");
    var sql_string = 'select * from `' + db + '`';
    console.log("[数据库语句]:" + sql_string);
    var arr = [];
    connection.query(sql_string, function (err, rows) {
        console.log("连接成功");
        if (err) throw err;
        arr = JSON.stringify(rows);
        console.log("返回数据");
        res.status(200).json(rows);
    });
    //关闭连接
    console.log("关闭连接");
    connection.end();
}
exports.selectSQL = selectSQL;