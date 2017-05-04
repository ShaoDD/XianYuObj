define([
    "jquery",
    "fastClick",
    "mobileLayer",
    "IO"
], function ($, FC, mL, IO) {
    $(document).ready(function () {
        mL.open({
            content: '移动版和PC版不能同时存在同一页面'
            ,btn: '我知道了'
        });
    })
});