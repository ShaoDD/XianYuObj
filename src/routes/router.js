var express = require('express');
var router = express.Router();

//APP路由
require("./app/app-router").appRouter(router);
require("./app/app-api").appAPI(router);

//vue路由
require("./vue/vue-router").vueRouter(router);
require("./vue/vue-api"),vueAPI(router);

//
require("./APIServer/APIServer").APIServer(router);

module.exports = router;