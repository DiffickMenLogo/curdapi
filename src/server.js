"use strict";
exports.__esModule = true;
var process_1 = require("process");
var dotenv = require("dotenv");
var http_1 = require("http");
var myApi_1 = require("./myApi");
dotenv.config();
var port = process_1.env.PORT || 3000;
var server = (0, http_1.createServer)(myApi_1.myApi);
server.listen(port, function () {
    console.log("Server running at port ".concat(port));
});
