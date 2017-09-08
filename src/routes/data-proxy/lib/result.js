/**
 * 数据层返回结果对象
 */
function Result(rest){
    this.code = rest.code || 1;//默认 1：出错， 0：正常
    this.msg = rest.msg || "";//数据层返回信息
    this.data = rest.data || {};//返回数据，默认为空
}

module.exports = Result;

