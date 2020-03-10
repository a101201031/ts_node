import { Router, Request, Response } from 'express';
import { userRouter } from './user';

export const apiRouter = Router(); //export 해줌으로써 다른 곳에서 apiRouter 객체를 import 할 수 있음
apiRouter.use('/user', userRouter);
