var express = require('express');
var router = express.Router();

//APP路由
require("./app-router").appRouter(router);
require("./app-api").appAPI(router);

//
require("./APIServer/APIServer").APIServer(router);

module.exports = router;