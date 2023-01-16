"use strict";
exports.__esModule = true;
exports.getReqData = void 0;
function getReqData(req) {
    return new Promise(function (resolve, reject) {
        try {
            var body_1 = '';
            req.on('data', function (chunk) {
                body_1 += chunk.toString();
            });
            req.on('end', function () {
                resolve(body_1);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.getReqData = getReqData;
