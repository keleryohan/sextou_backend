import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const router = Router();
const usersController = new UsersController();

router.post('/', usersController.create);

router.get('/participants', usersController.getParticipants);

export default router;
