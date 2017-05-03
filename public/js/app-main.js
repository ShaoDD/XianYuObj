requirejs.config({
    baseUrl: '/plugins/',

    paths: {
        jquery: 'jquery-3.2.1.min',
        fastClick: 'fastclick-master/lib/fastclick',
        app: '/js/biz/app',
        biz: '/js/biz',
        bizjs: '/js/biz/biz',
        mobileLayer: 'layer-v3.0.3/layer/mobile/layer',
        IO: 'novem-io',
        overall: '/js/biz/app/index/overall'
    },

    "shim": {
        "APP": ["jquery"],
        "bizjs": ["APP", "jquery"],
        "mobileLayer": ["jquery"],
        "IO": ["jquery"],
        "fastClick": ["jquery"]
    }
})
;
requirejs(["app/app"]);