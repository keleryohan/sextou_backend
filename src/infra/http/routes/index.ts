import { Router } from 'express';

import UsersRouter from './users.routes';
import SessionsRouter from './sessions.routes';

const router = Router();

router.use('/users', UsersRouter);
router.use('/sessions', SessionsRouter);

export default router;