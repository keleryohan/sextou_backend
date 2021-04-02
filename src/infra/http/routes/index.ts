import { Router } from 'express';

import UsersRouter from './users.routes';

const router = Router();

router.use('/users', UsersRouter);

export default router;