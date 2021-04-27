import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import EventsController from '../controllers/EventsController';

const eventsRouter = Router();
const upload = multer(uploadConfig.multer);
const eventsController = new EventsController();

eventsRouter.use(ensureAuthenticated);

eventsRouter.post('/', upload.single('img'), eventsController.create);
eventsRouter.get('/me', eventsController.show);
eventsRouter.patch('/updateInvite', eventsController.updateInvitationCode);
eventsRouter.get('/nearby', eventsController.getNearby);
eventsRouter.get('/getById',eventsController.getById);
eventsRouter.get('/getByCode',eventsController.getByInvitationCode);

export default eventsRouter;