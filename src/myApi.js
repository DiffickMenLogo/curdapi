"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.myApi = void 0;
var uuid_1 = require("uuid");
var users_1 = require("./data/users");
var user_controller_1 = require("./user/user.controller");
var utils_1 = require("./utils/utils");
var myApi = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users_2, id_1, user, user, currentUser, newUser, id_2, body, updatedUser, id_3, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 25, , 26]);
                if (!req.url) return [3 /*break*/, 24];
                if (!(req.url === '/api/users' && req.method === 'GET')) return [3 /*break*/, 2];
                return [4 /*yield*/, new user_controller_1.Users().getAllUsers()];
            case 1:
                users_2 = _a.sent();
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(users_2));
                return [3 /*break*/, 24];
            case 2:
                if (!(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET')) return [3 /*break*/, 7];
                id_1 = req.url.split('/')[3];
                if (!!(0, uuid_1.validate)(id_1)) return [3 /*break*/, 3];
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'UserId is not uuid' }));
                return [3 /*break*/, 6];
            case 3:
                if (!!users_1["default"].find(function (u) { return u.id === id_1; })) return [3 /*break*/, 4];
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'User not found' }));
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, new user_controller_1.Users().getUserById(id_1)];
            case 5:
                user = _a.sent();
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(user));
                _a.label = 6;
            case 6: return [3 /*break*/, 24];
            case 7:
                if (!(req.url === '/api/users' && req.method === 'POST')) return [3 /*break*/, 12];
                return [4 /*yield*/, (0, utils_1.getReqData)(req)];
            case 8:
                user = _a.sent();
                currentUser = JSON.parse(user);
                if (!(!currentUser.username || !currentUser.age || !currentUser.hobbies)) return [3 /*break*/, 9];
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Please provide all fields' }));
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, new user_controller_1.Users().createUser(JSON.parse(user))];
            case 10:
                newUser = _a.sent();
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(newUser));
                _a.label = 11;
            case 11: return [3 /*break*/, 24];
            case 12:
                if (!(req.url.match(/\/api\/users\//) && req.method === 'PUT')) return [3 /*break*/, 18];
                id_2 = req.url.split('/')[3];
                return [4 /*yield*/, (0, utils_1.getReqData)(req)];
            case 13:
                body = (_a.sent());
                if (!!(0, uuid_1.validate)(id_2)) return [3 /*break*/, 14];
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'UserId is not uuid' }));
                return [3 /*break*/, 17];
            case 14:
                if (!!users_1["default"].find(function (u) { return u.id === id_2; })) return [3 /*break*/, 15];
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'User not found' }));
                return [3 /*break*/, 17];
            case 15: return [4 /*yield*/, new user_controller_1.Users().updateUser(id_2, JSON.parse(body))];
            case 16:
                updatedUser = _a.sent();
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(updatedUser));
                _a.label = 17;
            case 17: return [3 /*break*/, 24];
            case 18:
                if (!(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'DELETE')) return [3 /*break*/, 23];
                id_3 = req.url.split('/')[3];
                if (!!(0, uuid_1.validate)(id_3)) return [3 /*break*/, 19];
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'UserId is not uuid' }));
                return [3 /*break*/, 22];
            case 19:
                if (!!users_1["default"].find(function (u) { return u.id === id_3; })) return [3 /*break*/, 20];
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'User not found' }));
                return [3 /*break*/, 22];
            case 20: return [4 /*yield*/, new user_controller_1.Users().deleteUser(id_3)];
            case 21:
                _a.sent();
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'User deleted' }));
                _a.label = 22;
            case 22: return [3 /*break*/, 24];
            case 23:
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Route not found' }));
                _a.label = 24;
            case 24: return [3 /*break*/, 26];
            case 25:
                err_1 = _a.sent();
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Server error' }));
                console.log(err_1);
                return [3 /*break*/, 26];
            case 26: return [2 /*return*/];
        }
    });
}); };
exports.myApi = myApi;
