/**
 * 数据代理层，服务端可通过http向其他服务器发送数据请求，也可以把本地的json数据文件发送给客户端
 * 针对客户端发起的，面向多种数据服务的中间代理层
 * Created by ben on 14-11-9.
 */
function DataProxy(opt) {
    this.req = opt.req;
    this.res = opt.res;
    this.reqType = opt.reqType;
    this.reqOption = opt.reqOption;
    this.dataHandler = getDataHandler(this.reqType);
}

function getDataHandler(reqType) {
    return require("./" + reqType + "client");

    // if(reqType == reqtype.file){
    //     return require("./fileclient");
    // }
    //
    // if(reqType == reqtype.dfs){
    //     return require("./dfsclient");
    // }
    //
    // if(reqType == reqtype.mock){
    //     return require("./mockclient");
    // }
}

DataProxy.prototype.handleRequest = function () {
    this.dataHandler.handle(this.req, this.res, this.reqOption);
};

module.exports = DataProxy;
