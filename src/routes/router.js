var express = require('express');
var router = express.Router();

require("../routes/app/app-router").appRouter(router);
require("../routes/app/app-api").appAPI(router);

module.exports = router;