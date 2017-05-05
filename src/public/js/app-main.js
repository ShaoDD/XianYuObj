requirejs.config({
    baseUrl: '/js/',

    paths: {
        jquery: '/plugins/jquery-3.2.1.min',
        fastClick: '/plugins/fastclick-master/lib/fastclick',
        mobileLayer: '/plugins/layer-v3.0.3/layer/mobile/layer',
        IO: '/plugins/novem-io',
        flexible: '/plugins/flexible'
    },

    "shim": {
        "APP": ["jquery"],
        "mobileLayer": ["jquery"],
        "IO": ["jquery"],
        "fastClick": ["jquery"]
    }
})
;
requirejs(["app"]);