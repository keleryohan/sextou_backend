import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import EventsController from '../controllers/EventsController';

const eventsRouter = Router();
const eventsController = new EventsController();

eventsRouter.use(ensureAuthenticated);

eventsRouter.post('/', eventsController.create);
eventsRouter.get('/me', eventsController.show);

export default eventsRouter;