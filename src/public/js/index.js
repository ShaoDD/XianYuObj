define([
    "jquery",
    "fastClick",
    "mobileLayer",
    "IO"
], function ($, FC, mL, IO) {
    $(function () {
        $("#day2").focus();
    });

    $(".confirm-btn").click(function () {
        var day = $(".day-input").val();
        var monthFlag = $(".month:checked").val();
        var base = $(".base-input").val();
        var add = $(".add-input").val();
        var off = $(".off-input").val();
        var late = $(".late-input").val();
        var other = $(".other-input").val();
        var days = getDays();
        if (!day || !base || !add || !off || !late || !other) {
            mL.open({
                content: '有信息没有填写',
                btn: '我知道了'
            });
        } else {
            var daySalary = base / days;
        }
    });

    function getDays() {
        //构造当前日期对象
        var date = new Date();
        //获取年份
        var year = date.getFullYear();
        //获取当前月份
        var mouth = date.getMonth() + 1;
        //定义当月的天数；
        var days;
        //当月份为二月时，根据闰年还是非闰年判断天数
        if (mouth == 2) {
            days = year % 4 == 0 ? 29 : 28;

        }
        else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
            //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
            days = 31;
        }
        else {
            //其他月份，天数为：30.
            days = 30;
        }
        return days;
    }

    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            if ($("#min2").is(":focus")) {
                $(".add-btn").click();
                $("#day2").focus();
            } else if ($("#hour2").is(":focus")) {
                $("#min2").focus();
            } else if ($("#day2").is(":focus")) {
                $("#hour2").focus();
            }
        }
    });

    $(".add-btn").click(function () {
        var cust_min = $("#min1").val();
        var cust_hour = $("#hour1").val();
        var cust_day = $("#day1").val();
        var new_min = $("#min2").val();
        var new_hour = $("#hour2").val();
        var new_day = $("#day2").val();
        if (cust_min == "") {
            cust_min = 0;
        }
        if (cust_hour == "") {
            cust_hour = 0;
        }
        if (cust_day == "") {
            cust_day = 0;
        }
        if (new_min == "") {
            new_min = 0;
        }
        if (new_hour == "") {
            new_hour = 0;
        }
        if (new_day == "") {
            new_day = 0;
        }
        cust_min = parseInt(cust_min);
        cust_hour = parseInt(cust_hour);
        cust_day = parseInt(cust_day);
        new_min = parseInt(new_min);
        new_hour = parseInt(new_hour);
        new_day = parseInt(new_day);
        var count_day = cust_day + new_day;
        var count_hour = cust_hour + new_hour;
        var count_min = cust_min + new_min;
        if (count_min >= 60) {
            count_hour = count_hour + Math.floor(count_min / 60);
            count_min = count_min - Math.floor(count_min / 60) * 60
        }
        if (count_hour >= 8) {
            count_day = count_day + Math.floor(count_hour / 8);
            count_hour = count_hour - Math.floor(count_hour / 8) * 8;
        }
        $("#min1").val(count_min);
        $("#hour1").val(count_hour);
        $("#day1").val(count_day);
        $("#min2").val('');
        $("#hour2").val('');
        $("#day2").val('');
        $("#min3").val(cust_min);
        $("#hour3").val(cust_hour);
        $("#day3").val(cust_day);
    });

    $(".clear-btn").click(function () {
        $("#min3").val(parseInt($("#min1").val()));
        $("#hour3").val(parseInt($("#hour1").val()));
        $("#day3").val(parseInt($("#day1").val()));
        $("#min1").val(0);
        $("#hour1").val(0);
        $("#day1").val(0);
        $("#min2").val('');
        $("#hour2").val('');
        $("#day2").val('');
    });

    $(".return-btn").click(function () {
        $("#min1").val(parseInt($("#min3").val()));
        $("#hour1").val(parseInt($("#hour3").val()));
        $("#day1").val(parseInt($("#day3").val()));
    })
});