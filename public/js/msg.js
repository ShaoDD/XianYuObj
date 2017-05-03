// 对话类项目模块
//

var MsgItem = wzzh.dw.Model.extend({
    defaults: {
        msgid: 0,
        userid: "", //发帖人ID
        username: "", //发帖人名称
        au_pic: '', //发帖人头像
        msgdate: "", //帖子发表时间
        fromstr: "", // 微社区
        commentcount: "", //评论数量
        msgpic: "", //帖子内容图片地址
        linkid: 0, // 微社区 ID = wsqid
        jar: [], //评论
        /*  jar.msgcontent 评论内容
            jar.msgdate 评论发表时间
            jar.msgid 评论id
            jar.msgpic 评论图片（一般没有）
            jar.status
            jar.userid 评论者Id
            jar.username 评论者名称
        */
        msgcontent: "", //评论内容
        ylock: "", //加密串
    },
    newFormSchema: {
        // 新建模板
        msgcontent: { title: "内容", validators: ['required'], type: "TextArea" }
    },
    updateMsg: function (o) {
        // 发贴
        o = o || {};
        var fd = new FormData();
        fd.append("fileToUpload", document.getElementById('fileuplod').files[0]);
        fd.append("t", teamStr);
        fd.append("module", "ttbean");
        fd.append("action", "f200SendMsg");
        fd.append("msgtype", o.msgtype);
        fd.append("linkid", o.linkid);
        fd.append("userid", o.userid);
        fd.append("msgcontent", this.get("msgcontent"));
        var xhr = new XMLHttpRequest();
        //xhr.upload.addEventListener("progress", uploadProgress, false);
        if (o.success) {
            xhr.addEventListener("load", o.success, false);
        }
        if (o.failure) {
            xhr.addEventListener("error", o.failure, false);
            xhr.addEventListener("abort", o.failure, false);
        }
        xhr.open("POST", "/ajax/app_ajax.aspx");
        xhr.send(fd);
        wzzh.ui.showBusy();
    },
    commentMsg: function (o) {
        // 回复
        var wParam = { t: teamStr, module: "ttbean", action: "f204addcommentwx", msgid: this.get("msgid"), msgcontent: this.get("msgcontent"), userid: o.userid };
        wzzh.getJson(wParam, o);
    },
    removeMsg: function (o) {
        var wParam = { t: teamStr, module: "ttbean", action: "f202removemsgwx", msgid: this.get("msgid"), userid:o.userid, username:o.username };
        wzzh.getJson(wParam, o);
    },
    removeComment: function (o) {
        var wParam = { t: teamStr, module: "ttbean", action: "f202removemsgwx", msgid: o.msgid, userid: o.userid, username: o.username };
        wzzh.getJson(wParam, o);
    }
});


var MsgList = Backbone.Collection.extend({
    model: MsgItem,
    retrieve: function (o) {
        var that = this;
        // f301querymsgrepbyuserid 得到回复
        // range : all aboutme

        // var wParam = {
        //     "action": "classmsg.get",
        //     "module": "ttbean",
        //     "t": teamStr,
        //     st_id: st_id,
        //     classid: class_id
        // }
        var wParam = o.wParam;
        // l(getNoticeListParam);
        wzzh.getJson(wParam, {
            success: function (msg) {
                if (o.success) o.success(msg);
            }
        })

    }
});




var MsgModule = (function () {
    var $el = null;
    var onSend = null;
    var files = null;
    // 点击文件按钮
    function fileUp(){
        $el.find("input[name='file0']").click();
    }


    function fileChanged(cur, cur1) {
        var f = cur.currentTarget.files[0];
        files = cur.currentTarget.files;
        //var f = document.getElementById('file0').files[0];
        if (f) {
            var t = f.type ? f.type : 'n/a';
            var objectURL = (window.webkitURL ? webkitURL : URL).createObjectURL(f)
            if (objectURL) {
                $el.find(".msgImage").attr("src", objectURL);
            } else {
                if (window.FileReader) {
                    reader = new FileReader();
                    reader.onload = function (e) {
                        $el.find(".msgImage").attr("src", e.target.result);
                    };
                    reader.readAsDataURL(f);
                }
            }
        }
    }


    // 显示
    function doShow(option) {
        setOption(option);
        var s1 = '<form  style="max-width:500px;" name="newForm">\
<textarea class="msgText" placeholder="请输入内容……" style="width: 100%; height: 100px;margin-top: 16px;margin-bottom:-6px;"></textarea>\
<div style="overflow:scroll;max-height:270px;"><img class="msgImage" style="width:100%;"/></div>\
<span style="display: inline-block; position: relative;">\
    <button type="button" class="btn btn-default btn-sm btn-raised "  onclick="MsgModule.fileUp()" >+ 图片</button>\
    <input type="file" name="file0" onchange="MsgModule.fileChanged(event)" style="display:inline-block;width:1px;height:0px;filter:alpha(opacity:0);opacity:0;position:absolute;">\
</span>\
<span class="pull-right">\
    <button type="button" class="btn btn-primary btn-sm btn-raised skin-color" onclick="MsgModule.sendMsg()" >发送</button>\
</span>\
</form>';
         $el.append(s1);
    }

    function sendMsg() {
        if (onSend) {
            var msg = $el.find("textarea").val();
            msg = wzzh.string.lTrim(msg);
            var hasImg = !!($('.msgImage').attr('src'));
            if (!msg && !hasImg) {
                alert('请输入内容!');
                return;
            }
            onSend($el, files);
        }
    }

    // 配置： $el
    function setOption(option) {
        option = option || {};
        $el = option.$el || $el;
        onSend = option.onSend;
    }

    return {
        doShow: doShow,
        setOption: setOption,
        fileUp: fileUp,
        fileChanged: fileChanged,
        sendMsg: sendMsg,
    };
})();

// 信息展示模型
var MsgShowModule = (function () {
    var $el = null;
    var curMode = 0;   //  0 内容列表模式 1 发新帖模式 2 回复模式
    var onChg = null; // 模式变化
    var msgList = new MsgList;
    var msgListView = null;
    var wParam = {};
    var type = '';

    var singleModel = new MsgItem;

    var replyMsgId = 0; //  回复的 msgid

    var MsgItemView = wzzh.dw.View.extend({
        className: "chat-item-box",
        render: function (o) {
            o = o || {};
            var vo = this.model;
            //  '<img src="' + vo.get("au_pic") + '" alt="user image" class="online"/>'
            var dStr = vo.get("msgdate");
            dStr = dStr.replace("t", " ");
            dStr = dStr.replace("T", " ");
            dStr = dStr.replace(/-/g, "/");
            var tickDate = new Date(dStr);
            var str =
                '<div class="clearfix message" style="margin: 16px;">\
                    <small class="message__time pull-right">' + vo.get("fromstr") + ' '+ tickDate.Format(" MM-dd hh:mm") + '</small>\
                    <img src="' + (vo.get("au_pic") || "/img/unknow.png") + '" alt="user image" class="pull-left message__au-pic"/>\
                    <div class="chat-user pull-left" style="margin-left: 10px;margin-top: 12px;font-size: 16px;">' + vo.get("username") + '</div>\
                </div>';
            str += '<p class="message__msgcontent">' + vo.get("msgcontent") + '</p>';
            var msgpic = vo.get("msgpic");
            if (msgpic != "") {
                str += '<a href="' + msgpic + '"><img style="width: 100%;" class="msgpic" src="' + msgpic + '"/></a>';
            }
            var jar = vo.get("jar");
            var canDelete = true;
            str += '<div class="msgbottom" style="text-align:right;"><button type="button" class="btn btn-success btn-xs cell-with-event event-replymsg" style="margin-left:15px;"><span class="fa fa-reply"></span>&nbsp;评论</button>';

            if (canDelete) {
                // 自己的帖子或管理员
                str += '<button type="button" class="btn btn-default btn-xs cell-with-event event-delmsg" style="margin-left:10px;"><span class="fa fa-trash-o"></span>&nbsp;删除</button>';
            }
            str += '</div>';
            if (jar.length > 0) {
                str += '<div class="attachment" style="border-top: 1px solid #ddd;">';
                var i;
                for (i = 0; i < jar.length; i++) {
                    str += this.formatChatComment(jar[i], canDelete);
                }
                str += '</div>';
            }

            this.$el.html(str); //显示数据
            return this;
        },
        renderSubject: function(o){
            o = o || {};
            var vo = this.model;
            var dStr = vo.get("msgdate");
            dStr = dStr.replace("t", " ");
            dStr = dStr.replace("T", " ");
            dStr = dStr.replace(/-/g, "/");
            var tickDate = new Date(dStr);
            try{
                var msgcontent = JSON.parse(vo.get("msgcontent"))
            }catch(e){
                l(vo.get("msgcontent"));
                var msgcontent = vo.get("msgcontent");
            }
            var str =
                '<div class="clearfix message" style="margin: 16px;">\
                    <small class="message__time pull-right">' + vo.get("fromstr") + ' '+ tickDate.Format(" MM-dd hh:mm") + '</small>\
                    <img src="' + (vo.get("au_pic") || "/img/unknow.png") + '" alt="user image" class="pull-left message__au-pic"/>\
                    <div class="chat-user pull-left" style="margin-left: 10px;margin-top: 12px;font-size: 16px;">' + vo.get("username") + '</div>\
                </div>';
            str += '<div class="message__msgcontent">\
                        <span class="inlink-block" style="color:red;">' + (msgcontent.time || '') + '</span>的<span class="inlink-block" style="color:green;">' + (msgcontent.subject || '') + '</span>作业，预计用时<span class="inlink-block">' + (msgcontent.duration || '') + '</span>\
                        <div>作业内容如下:</div>\
                        <div>' + (msgcontent.msgText || '') + '</div>\
                    </div>';
            var msgpic = vo.get("msgpic");
            if (msgpic != "") {
                str += '<a href="' + msgpic + '"><img style="width: 100%;" class="msgpic" src="' + msgpic + '"/></a>';
            }
            var jar = vo.get("jar");
            var canDelete = true;
            str += '<div class="msgbottom" style="text-align:right;"><button type="button" class="btn btn-success btn-xs cell-with-event event-replymsg" style="margin-left:15px;"><span class="fa fa-reply"></span>&nbsp;评论</button>';

            if (canDelete) {
                // 自己的帖子或管理员
                str += '<button type="button" class="btn btn-default btn-xs cell-with-event event-delmsg" style="margin-left:10px;"><span class="fa fa-trash-o"></span>&nbsp;删除</button>';
            }
            str += '</div>';
            if (jar.length > 0) {
                str += '<div class="attachment" style="border-top: 1px solid #ddd;">';
                var i;
                for (i = 0; i < jar.length; i++) {
                    str += this.formatChatComment(jar[i], canDelete);
                }
                str += '</div>';
            }

            this.$el.html(str); //显示数据
            return this;
        },
        // 显示评论
        formatChatComment: function (vo, canDelete) {
            var rtn = '';
            var dStr = vo.msgdate;
            dStr = dStr.replace("t", " ");
            dStr = dStr.replace("T", " ");
            dStr = dStr.replace(/-/g, "/");
            var tickDate = new Date(dStr);
            rtn += '<div class="msgBox">\
                        <a href="#" class="name">\
                            <img src="' + (vo.au_pic || "/img/unknow.png") + '" alt="user image" class="msgBox__au-pic"/>\
                            ' + vo.username +'&nbsp;\
                        </a>\
                        <p class="msgBox__msgcontent">' + vo.msgcontent + '</p>';
                rtn += '<small class="msgDate">(' + tickDate.Format("MM-dd hh:mm") + ')</small>';
            if (canDelete) {
                rtn += '<button type="button" class="btn btn-default btn-xs cell-with-event event-delcomment' + vo.msgid + '">删除</button>';
            }
            if (vo.jar != null) {
                var i;
                for (i = 0; i < vo.jar.length; i++) {
                    rtn += this.formatChatReply(vo.jar[i]);
                }
            }
            rtn += '</div>';
            return rtn;
        }
    });

    var MsgListView = wzzh.dw.View.extend({
        render: function (o) {
            this.$el.html(""); //显示前清空页面
            var that = this; //this对象在程序中随时会改变，而var that=this之后，that没改变之前仍然是指向当时的this，这样就不会出现找不到原来的对象。
            this.collection.each(function (vo) {
                var table = new MsgItemView({
                    model: vo
                });
                if (type === 'subject') {
                    that.$el.append(table.renderSubject(o).el);
                }else{
                    that.$el.append(table.render(o).el);
                }
            }, this);
            return this;
        }
    });
    // 显示
    function doShow(option) {
        setOption(option);
        var oldMsgListView = {};
        if (!msgListView || msgListView != oldMsgListView) {
            msgListView = new MsgListView({
                collection: msgList
            });
            msgList.unbind("itemClick").bind("itemClick", msgClicked);
            oldMsgListView = msgListView;
        }
        msgList.retrieve({
            success: function (msg) {
                var ar = msg.rtndt;
                msgList.reset(ar);
                msgListView.render();
                //$el.find(".msgDiv0").empty().append(msgListView.el);
                var a1 = $el.find(".msgDiv0");
                a1.empty().append(msgListView.el);
                // $('.message__msgcontent').append(template);
            },
            wParam: wParam
        });
    }

    // 点击信息按钮处理
    function msgClicked(o) {
        var msgModel = o.model;
        switch (o.event) {
            case "replymsg":
                // 回复
                replyMsgId = o.model.get("msgid");
                chgMode(2);
                break;
            case "delmsg":
                var info = new Backbone.BootstrapModal({
                    content: '是否删除该信息？',
                    okText: "确认删除",
                    title: "提示"
                });
                info.open(function () {
                    o.model.removeMsg({ success: refreshPage, userid: st_id, username: "" });
                });
                break;
        }
        if (o.event.substring(0, 10) == "delcomment") {
            var info = new Backbone.BootstrapModal({
                content: '是否删除该回复？',
                okText: "确认删除",
                title: "提示"
            });
            info.open(function () {
                o.model.removeComment({ success: refreshPage, userid: st_id, username: "", msgid: parseInt(o.event.substring(10)) });
            });
        }
    }

    // 配置： $el
    function setOption(option) {
        option = option || {};
        onChg = option.onChg || onChg;
        wParam = option.wParam;
        type = option.type;

        if (!$el) {
            $el = option.$el || $el;
            if ($el) {
                //准备显示区域
                var str = '<section class="msgDiv0"></section><section class="msgDiv1" style="position:fixed;width:100%;top:45px;"></section>\
                    <section class="msgDiv2" style="position:absolute;width:100%;top:45px;">\
    <form name="replyForm" style="position:fixed;width:100%;top:45px;">\
    <textarea class="input" placeholder="请输入回复……" style="width: 100%; height: 120px;"></textarea>\
  <div class="pull-right">\
      <button type="button" class="btn btn-default btn-sm btn-raised" onclick="MsgShowModule.chgMode(0)" >关闭</button>\
      <button type="button" class="btn btn-primary btn-sm btn-raised skin-color" onclick="MsgShowModule.onReply()" >&nbsp;回&nbsp;复&nbsp;</button></div>\
  <div class="clearfix"></div>\
    </form></section>';
                $el.html(str);
            }
        }

    }

    function onReply() {
        if (replyMsgId) {
            var msg = $el.find(".msgDiv2 textarea").val();
            $el.find("textarea").empty();
            msg = wzzh.string.lTrim(msg);
            if (msg == null || msg.length == 0) {
                wzzh.ui.msg("请输入内容!");
                return;
            }
            singleModel.set(singleModel.defaults);
            singleModel.set("msgid", replyMsgId);
            singleModel.set("msgcontent", msg);
            singleModel.commentMsg({ success: refreshPage, userid: st_id });
        }
    }

    function refreshPage() {
        //回复
        $('.input').val('');
        var refreshPageParam = {
            $el: $el,
            wParam: wParam,
            onChg: onChg
        };
        if (type == 'subject')
            refreshPageParam.type = 'subject';

        doShow(refreshPageParam);
        chgMode(0);
    }

    // 修改显示模式 0 内容列表模式 1 发新帖模式 2 回复模式
    function chgMode(mode) {
        // $el.find("section").hide();
        $el.find("section").css({
            'visibility': 'hidden'
        });
        // $el.find(".msgDiv" + mode).show();
        $el.find(".msgDiv" + mode).css({
            'visibility': 'visible'
        });
        if (onChg && curMode != mode) {
            onChg(mode);
        }
        curMode = mode;
    }

    function getMode() {
        return curMode;
    }

    return {
        doShow: doShow,
        chgMode: chgMode,
        getMode:getMode,
        onReply:onReply,
        setOption: setOption,
    };
})();

