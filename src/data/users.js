"use strict";
exports.__esModule = true;
var uuid_1 = require("uuid");
var users = [
    {
        id: (0, uuid_1.v4)(),
        username: 'Diffick',
        age: 25,
        hobbies: ['Coding', 'Gaming', 'Reading']
    },
    {
        id: (0, uuid_1.v4)(),
        username: 'John',
        age: 30,
        hobbies: ['Coding', 'Music', 'Swimming']
    },
    {
        id: (0, uuid_1.v4)(),
        username: 'Jane',
        age: 20,
        hobbies: ['Coding', 'Gaming', 'Swapping']
    },
];
exports["default"] = users;
