exports.vueRouter = function (router) {
    //首页
    router.get("/demoVue/vue", function (req,res) {
        res.render("demoVue/vue",{
            css: 'vue',
            layout: 'demoVue/all-layout',
            jscript: 'vue',
            title: 'Demo-Vue'
        })
    })
};