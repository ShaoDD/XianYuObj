define([
    "jquery",
    "fastClick",
    "Layer",
    "IO"
], function ($, FC, L, IO) {
    $(function () {
        $("#day2").focus();
        var date = new Date();
        var now_month = date.getMonth() + 1;
        $(".month-select").val(now_month);
    });

    $(".month").click(function () {
        var monthFlag = $(".month:checked").val();
        if (monthFlag == '2') {
            $(".working-days").show();
        } else {
            $(".working-days").hide();
        }
    });

    $(".confirm-btn").click(function () {
        var monthFlag = $(".month:checked").val();
        var base = $(".base-input").val();
        if (!base) {
            L.alert('请填写基本工资');
            return;
        } else {
            base = parseInt(base);
        }
        //加班时间
        var add = true;
        $(".add-input").each(function () {
            if (!$(this).val()) {
                add = false;
            }
        });
        //请假时间
        var off = true;
        $(".off-input").each(function () {
            if (!$(this).val()) {
                off = false;
            }
        });
        var late = $(".late-input").val();
        if (!late) {
            L.alert('请填写迟到扣款');
            return;
        } else {
            late = parseInt(late);
        }
        var other = $(".other-input").val();
        if (!other) {
            L.alert('请填写其他扣款');
            return;
        } else {
            other = parseInt(other);
        }
        var otherAdd = $(".otherAdd-input").val();
        if (!otherAdd) {
            L.alert('请填写其他增加');
            return;
        } else {
            otherAdd = parseInt(otherAdd);
        }
        var days = getDays();
        var daySalary = Math.floor((base / days) * 100) / 100;
        var hourSalary = Math.floor((daySalary / 8) * 100) / 100;
        var minuteSalary = Math.floor((hourSalary / 60) * 100) / 100;
        //计算加班工资
        if (add) {
            var add_count =
                daySalary * parseInt($(".add-input-day").val()) +
                hourSalary * parseInt($(".add-input-hours").val()) +
                minuteSalary * parseInt($(".add-input-minutes").val());
        } else {
            L.alert('请填写加班时间')
        }
        //计算请假工资
        if (off) {
            var off_count =
                daySalary * parseInt($(".off-input-day").val()) +
                hourSalary * parseInt($(".off-input-hours").val()) +
                minuteSalary * parseInt($(".off-input-minutes").val());
        } else {
            L.alert('请填写请假时间')
        }
        var total_count;
        if (monthFlag == 2) {
            var day = $(".day-input").val();
            if (!day) {
                L.alert('请填写在职天数');
            } else {
                day = parseInt(day);
                total_count = (day * daySalary + add_count + otherAdd - off_count - late - other).toFixed(2);
            }
        } else {
            total_count = (base + add_count + otherAdd - off_count - late - other).toFixed(2);
        }
        $(".warning").html(total_count)
    });

    function getDays() {
        //构造当前日期对象
        var date = new Date();
        //获取年份
        var year = date.getFullYear();
        //获取月份
        var mouth = $(".month-select").val();
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
    });

    $(".next-add-btn").click(function () {
        $(".add-input-day").val($("#day1").val());
        $(".add-input-hours").val($("#hour1").val());
        $(".add-input-minutes").val($("#min1").val());
    });

    $(".next-off-btn").click(function () {
        $(".off-input-day").val($("#day1").val());
        $(".off-input-hours").val($("#hour1").val());
        $(".off-input-minutes").val($("#min1").val());
    })
});