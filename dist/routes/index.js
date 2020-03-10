"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("./user");
exports.apiRouter = express_1.Router(); //export 해줌으로써 다른 곳에서 apiRouter 객체를 import 할 수 있음
exports.apiRouter.use('/api/user', user_1.userRouter);
//# sourceMappingURL=index.js.map