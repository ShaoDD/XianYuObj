/**
 * 数据代理层，服务端可通过http向其他服务器发送数据请求，也可以把本地的json数据文件发送给客户端
 * 针对客户端发起的，面向多种数据服务的中间代理层
 */

var reqtype = require("./reqtype");
function DataProxy(opt) {
    this.req = opt.req;
    this.res = opt.res;
    this.reqType = opt.reqType;
    this.reqOption = opt.reqOption;
    this.dataHandler = getDataHandler(this.reqType);
}

function getDataHandler(rtype) {
    if (rtype == reqtype.http) {
        return require("./httpclient");
    }

    if (rtype == reqtype.file) {
        return require("./fileclient");
    }

    if (rtype == reqtype.dfs) {
        return require("./dfsclient");
    }

    if (rtype == reqtype.mock) {
        return require("./mockclient");
    }
    return require("./httpclient");
}

DataProxy.prototype.handleRequest = function () {
    this.dataHandler.handle(this.req, this.res, this.reqOption);
};

module.exports = DataProxy;
