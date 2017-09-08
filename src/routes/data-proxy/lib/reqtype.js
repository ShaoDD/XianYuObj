/**
 * 客户端请求类型，定义后台取数据方式
 * Created by ben on 14-11-9.
 */

var reqtype = {
    http: "http",//发送http请求数据
    https: "https",
    file: "file",//发送本地数据文件
    dfs: "dfs",//分布式文件系统
    mock: "mock"//开发时的mock数据
};

module.exports = reqtype;