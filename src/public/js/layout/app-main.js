requirejs.config({
    baseUrl: '/js/',

    paths: {
        jquery: '/plugins/jquery-3.2.1.min',
        fastClick: '/plugins/fastclick-master/lib/fastclick',
        mobileLayer: '/plugins/layer-v3.0.3/layer/mobile/layer',
        Layer: '/plugins/layer-v3.0.3/layer/layer',
        IO: '/plugins/novem-io',
        flexible: '/plugins/flexible',
        VUE: '/plugins/vue'
    },

    "shim": {
        "APP": ["jquery"],
        "mobileLayer": ["jquery"],
        "IO": ["jquery"],
        "fastClick": ["jquery"]
    }
})
;
requirejs(["app/app"]);