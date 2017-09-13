define([
    "jquery",
    "fastClick",
    "Layer",
    "IO",
    "VUE"
], function ($, FC, L, IO, Vue) {
    var demo1 = new Vue({
        el: '#demo1',
        data: {
            message: 'hello world!'
        }
    });

    var demo2 = new Vue({
        el: '#demo2',
        data: {
            message: '该页面加载于' + new Date().toLocaleString()
        }
    });

    var demo3 = new Vue({
        el: '#demo3',
        data: {
            flag: true
        },
        methods: {
            changeFlag: function () {
                this.flag = !this.flag
            }
        }
    });

    var demo4 = new Vue({
        el: '#demo4',
        data: {
            list: [
                {data: '学习JavaScript'},
                {data: '学习Vue'},
                {data: '写demo'}
            ]
        },
        methods: {
            addList: function () {
                var num = this.list.length + 1;
                this.list.push({data: 'test' + num});
            }
        }
    });

    var demo5 = new Vue({
        el: '#demo5',
        data: {
            data: '文字同步'
        }
    });

    Vue.component('demo-list', {
        props: ['item'],
        template: '<p>{{item.text}}</p>'
    });
    var demo6 = new Vue({
        el: '#demo6',
        data: {
            list: [
                {id: 0, text: 'test0'},
                {id: 1, text: 'test1'},
                {id: 2, text: 'test2'}
            ]
        }

    })

});