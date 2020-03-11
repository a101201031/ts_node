import { Router, Request, Response } from 'express';

export const userRouter = Router();

interface User {
  // Type을 만듦
  name: string;
  email: string;
}

let users: User[] = [
  { name: '건우', email: 'rjsdn@appm' },
  { name: '재건', email: 'worjs@appm' },
  { name: '중민', email: 'wndals@appm' },
];

// get 요청 부분, users의 정보를 준다
userRouter.get('/', (req: Request, res: Response) => {
  res.json({
    data: users,
  });
});

// post 요청 부분
userRouter.post('/', (req: Request, res: Response) => {
  const { body } = req; //비구조화 할당 == req.body를 body 라는 이름 그대로 가져와 사용

  if (!body.name || !body.email) {
    // 요청값에 name이나 email이 없을 경우
    return res.status(400).json({ message: 'name or email is Not Found' });
  }
  if (typeof body.name !== 'string' || typeof body.email !== 'string') {
    // 요청값의 타입이 다를 경우
    return res.status(400).json({ message: 'data type error' });
  }

  if (users.findIndex(user => user.email === body.email) !== -1) {
    // 이미 해당 email이 존재할 경우
    return res.status(409).json({ message: 'Dupleilcate Email Error' });
  }

  /* filter로 찾는 방법
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

  users.push(body); //users에 값 추가

  res.json({
    // 추가된 데이터를 다시 보여줌
    data: body,
  });
});

interface FuckingUpdate {
  // 업데이트 시에 필요한 정보를 타입으로 만듦
  find: {
    email: string;
  };
  update: Partial<User>; // 업데이트 하고싶은 값은 하나일 수 있으므로 undefind도 가능하도록 Partial로 설정하여 업데이트 타입을 optional로 설정
}

userRouter.put('/', (req: Request, res: Response) => {
  const body: FuckingUpdate = req.body;

  //수정 대상 검증

  if (
    typeof body.find.email !== 'string' ||
    users.findIndex(user => user.email === body.find.email) === -1 // users에서 findIndex로 검색하는데 검색하는 값은 user.email과 body.find.email이 동일해야 한다.
  ) {
    return res
      .status(400)
      .json({ message: 'Fucking Type Error Or Fucking Not Found Email' });
  }
  //수정 데이터 검증
  if (!body.find || !body.update || !body.find.email) {
    // body의 요소들이 전부 값을 가지고 있는지 판단
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
