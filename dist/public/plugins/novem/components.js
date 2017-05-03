/**
 * Created by wdb on 19/3/15.
 */
define([
    "jquery"
],function($) {
    var Alert = function(msg,callback) {
        var load = msg ? msg : "这是一个弹出确认框";
        var height = $(window).height();
        var top = $(window).scrollTop();
        var html = '<div id="alertFram" style="position: fixed; left: 10%; top: 56%; width: 80%; margin-top: -75px; z-index: 10001; border-radius: 6px;">' +
            '<ul style="list-style:none;margin:0px;padding:0px;width:100%;border-radius: 6px;"> ' +
            '<li style="background: rgba(255, 255, 255, 1);text-align:center;font-size:14px; color: black;border-radius: 6px;">' +
            '<div style="padding:21px 10px;line-height: 1.5em;border-bottom: solid 1px #e4e4ee;">'+ load +'</div>' +
            '<div class="nm-ok" style="text-align:center;font-size:14px;padding:10px 3px;color: dodgerblue;">好</div></li> ' +
            '<li></li> </ul> </div>';
        html += '<div id="shield" style="position: fixed; left: 0px; top: 0; width: 100%; height: 100%; text-align: center; z-index: 10000; opacity: 0.2; background: rgb(51, 51, 51);"></div>';
        var alert = $(html);
        Alert.prototype.show = function() {
            $("body").css("overflow","hidden");
            //$("body").css("position","fixed");
            $("body").append(alert);
            return alert;
        }
        alert.one(".nm-ok").on('click',function(){
            $("body").css("overflow","auto");
            //$("body").css("position","absolute");
            alert.remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    }
    var Confirm = function(msg,callback) {
        var height = $(window).height();
        var top = $(window).scrollTop();
        var html = '<div id="alertFram" style="position: fixed; left: 5%; top: 43%; width: 90%; margin-top: -75px; z-index: 10001; border-radius: 6px;">' +
            '<ul style="list-style:none;margin:0px;padding:0px;width:100%;;float: left"> ' +
            '<li style="background: rgba(255, 255, 255, 1);text-align:center;font-size:14px; color: #000000;line-height: 1.5em;border-bottom: solid 1px #e4e4ee;float: left;width: 100%;border-radius: 6px;">' +
            '<div style="padding:26px 10px;line-height: 1.5em;border-bottom: solid 1px #e4e4ee;">'+msg+'</div>' +
            '<div class="nm-ok" style="-webkit-box-sizing: border-box; -moz-box-sizing: border-box;box-sizing: border-box;width: 50%;float: left;text-align: center;border-right:solid 1px #e4e4ee;color: dodgerblue;line-height: 39px">确定</div>' +
            '<div class="nm-cancel" style=" width: 50%;float: left;text-align: center;color: dodgerblue;height: 39px;line-height: 39px;">取消</div>' +
            '</li></ul></div>';
        html += '<div id="shield" style="position: fixed; left: 0px; top: 0; width: 100%; height: 100%; text-align: center; z-index: 10000; opacity: 0.2; background: rgb(51, 51, 51);"></div>';
        var confirm = $(html);

        Confirm.prototype.show = function() {
            $("body").css("overflow","hidden");
            $("body").append(confirm);
            return confirm;
        };
        confirm.one("click",".nm-cancel",function(){
            $("body").css("overflow","auto");
            confirm.remove();
        });
        confirm.one("click",".nm-ok",function(){
            $("body").css("overflow","auto");
            confirm.remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    };

    var Layer = {
        Layer : null,
        createLoading:function(msg) {
            var load = msg ? msg : "正在加载...";
            var loadHtml = $('<div id="wxDialogLoad" class="wx-dialog-mod" style="display: none;">' +
            '<div class="wx-mask"></div><div class="wx-dialog wx-dialog-load">' +
            '<div class="dialog-bd"><i class="icon-load"></i><p id="wxDialogLoadText">'+ load +'</p>' +
            '</div></div></div>');
            this.Layer = loadHtml;
        },
        createInfo:function(msg) {
            var load = msg ? msg : "温馨提示：";
            var loadHtml = $('<div id="N_motify_info" class="motify" style="display: block;"><div class="motify-inner">'+ load +'</div></div>');

            if($("body").find("#N_motify_info").length==0) {
                this.Layer = loadHtml;
            }
        },
        createAlert:function(msg) {

        },
        createWeixin:function() {
            var div = $('<div id="WeiXinShareTips"><img src="/images/wap/sharetip.png" width="80%" height="auto"/></div>');
            $('#WeiXinShareTips').on('click',function() {$('#WeiXinShareTips').remove();});
            if($("body").find("#WeiXinShareTips").length==0) {
                this.Layer = div;
            }
        },
        showType:function(msg,type) {
            var _this = this;
            switch (type) {
                case "info":
                    this.createInfo(msg);
                    setTimeout(function() {
                        _this.Layer.remove();
                    },2000);
                    break;
                case "load":
                    this.createLoading(msg);
                    break;
                case "alert":
                    this.createAlert(msg);
                    break;
                case "weixin":
                    this.createWeixin();
                    setTimeout(function() {
                        _this.Layer.remove();
                    },5000);
                    break;
                default :
                    this.createLoading(msg);
                    break;
            }
            if(type == "weixin") {
                if($("body").find("#WeiXinShareTips").length==0) {
                    $("body").append(this.Layer);
                    $("body").delegate("click","#WeiXinShareTips",function(e) {
                        _this.Layer.remove();
                    });
                }
            } else {
                if($("body").find("#N_motify_info").length==0) {
                    $("body").append(this.Layer);
                }
            }

        },
        show:function(msg,type) {
            this.showType(msg,type);
            this.Layer.show();
        },
        wx:function() {
            this.showType("","weixin");
            this.Layer.show();
        },
        alert:function(msg,callback) {
            var AL = new Alert(msg,callback);
            AL.show();
        },
        confirm:function(msg,callback) {
            var CM = new Confirm(msg,callback);
            CM.show();
        },
        hide:function() {
            this.Layer.remove();
        }
    };
    return Layer;
});