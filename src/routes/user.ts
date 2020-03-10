import { Router, Request, Response } from 'express';

export const userRouter = Router();

interface User {
  name: string;
  email: string;
}

let users: User[] = [
  { name: '건우', email: 'rjsdn@appm' },
  { name: '재건', email: 'worjs@appm' },
  { name: '중민', email: 'wndals@appm' },
];

userRouter.get('/', (req: Request, res: Response) => {
  res.json({
    data: users,
  });
});

userRouter.post('/', (req: Request, res: Response) => {
  const { body } = req; //비구조화 할당 == req.body를 body 라는 이름 그대로 가져와 사용

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

interface FuckingUpdate {
  find: {
    email: string;
  };
  update: Partial<User>;
}

userRouter.put('/', (req: Request, res: Response) => {
  const body: FuckingUpdate = req.body;

  //수정 대상 검증

  if (
    typeof body.find.email !== 'string' ||
    users.findIndex(user => user.email === body.find.email) === -1
  ) {
    return res
      .status(400)
      .json({ message: 'Fucking Type Error Or Fucking Not Found Email' });
  }
  //수정 데이터 검증
  if (!body.find || !body.update || !body.find.email) {
    return res.status(400).json({ message: 'Change Data is Not Found' });
  }

  if (
    body.update.email &&
    users.findIndex(users => users.email === body.update.email) !== -1
  ) {
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

interface FuckingDelete {
  email: string;
}

userRouter.delete('/', (req: Request, res: Response) => {
  const body: FuckingDelete = req.body;

  if (
    typeof body.email !== 'string' ||
    users.findIndex(user => user.email === body.email) === -1
  ) {
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
    deleted, // 데이터 명이 변수와 같을 경우 자동으로 해당 요소값 할당
  });
});
