var express = require('express');
var router = express.Router();

require("../src/routes/app-router").appRouter(router);
require("../src/routes/app-api").appAPI(router);

module.exports = router;