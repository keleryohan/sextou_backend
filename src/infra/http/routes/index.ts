import { Router } from 'express';

import UsersRouter from './users.routes';
import SessionsRouter from './sessions.routes';
import EventsRouter from './events.routes';

const router = Router();

router.use('/users', UsersRouter);
router.use('/sessions', SessionsRouter);
router.use('/events',EventsRouter);

export default router;


/*

criar evento:
POST - /events - body: name(nome), description(descrição), votingLimitDate(data limite para a votação), user_creator(id do usuário que criou)

listar todos os eventos em que o usuáio faz parte
GET - /events/:user_id (id do usuário vendo)

*/