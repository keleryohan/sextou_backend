import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const router = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

router.post('/', usersController.create);

router.get('/participants', usersController.getParticipants);

router.post('/participants', ensureAuthenticated, usersController.addParticipant);

router.patch(
  '/avatar', 
  ensureAuthenticated, 
  upload.single('avatar'),
  userAvatarController.update
);

export default router;
