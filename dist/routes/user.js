"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.userRouter = express_1.Router();
let users = [
    { name: '건우', email: 'rjsdn@appm' },
    { name: '재건', email: 'worjs@appm' },
];
exports.userRouter.get('/', (req, res) => {
    res.json({
        data: users,
    });
});
exports.userRouter.post('/', (req, res) => {
    const { body } = req; //비구조화 할당 == import
    console.log(body);
    if (!body.name || !body.email) {
        return res.status(400).json({ message: 'name or email is Not Found' });
    }
    if (typeof body.name !== 'string' || typeof body.email !== 'string') {
        return res.status(400).json({ message: 'data type error' });
    }
    if (users.findIndex(user => user.email === body.email) !== -1) {
        return res.status(409).json({ message: 'Dupleilcate Email Error' });
    }
    /*
      if (
          users.filter(user => {
              if (user.email === body.email) {
                  return true;
              }
              return false;
          }).length === 1
      ) {
          return res.status(409).json({ message: "Dupleilcate Email Error" });
      }
      */
    users.push(body);
    res.json({
        data: body,
    });
});
exports.userRouter.put('/', (req, res) => {
    const body = req.body;
    //수정 대상 검증
    if (users.findIndex(user => user.email === body.find.email) === -1) {
        return res.status(400).json({ message: 'Not Found Email' });
    }
    //수정 데이터 검증
    if (!body.find || !body.update || !body.find.email) {
        return res.status(400).json({ message: 'Change Data is Not Found' });
    }
    if (body.update.email &&
        users.findIndex(users => users.email === body.update.email) !== -1) {
        return res.status(409).json({ message: 'Dupleilcate Email Error' });
    }
    if (body.update.name && typeof body.update.name !== 'string') {
        return res.status(400).json({ message: 'data type error' });
    }
    //let updated: User;
    let updated = {};
    users = users.map(user => {
        if (user.email === body.find.email) {
            updated = { ...user, ...body.update };
            return { ...user, ...body.update }; //비구조화 할당 == 구조 분해 할당
        }
        return user;
    });
    res.json({
        data: updated,
    });
});
exports.userRouter.delete('/', (req, res) => {
    const body = req.body;
    if (typeof body.email !== 'string' ||
        users.findIndex(user => user.email === body.email) === -1) {
        return res
            .status(400)
            .json({ message: 'Fucking Type Error Or Fucking Not Found Email' });
    }
    let deleted = {};
    users = users.filter(user => {
        if (user.email === body.email) {
            deleted = user;
            return false;
        }
        return true;
    });
    res.json({
        deleted,
    });
});
//# sourceMappingURL=user.js.map