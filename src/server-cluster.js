"use strict";
exports.__esModule = true;
var process_1 = require("process");
var dotenv = require("dotenv");
var cluster = require('cluster');
var os_1 = require("os");
var http_1 = require("http");
var myApi_1 = require("./myApi");
dotenv.config();
var numCPUs = (0, os_1.cpus)().length;
var port = numCPUs + '000';
if (cluster.isMaster) {
    var server = (0, http_1.createServer)(myApi_1.myApi);
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork({ PORT: +port + i });
    }
    cluster.on('exit', function (worker, code, signal) {
        console.log("worker ".concat(worker.process.pid, " died"));
    });
}
else {
    var server = (0, http_1.createServer)(myApi_1.myApi);
    server.listen(process_1.env.PORT, function () {
        console.log("Worker ".concat(process.pid, " started and listening on port ").concat(process_1.env.PORT));
    });
}
