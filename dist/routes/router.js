var express = require('express');
var router = express.Router();

require("../routes/app-router").appRouter(router);
require("../routes/app-api").appAPI(router);

module.exports = router;