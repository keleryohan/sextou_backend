import { Request, Response } from 'express';

import CreateEventsService from '@services/CreateEventService';
import ListEventService from '@services/ListEventService';
import EventsRepository from '@infra/typeorm/repositories/EventsRepository';

class EventsController {
    public async create(request: Request, response: Response) {

        const {
            name,
            description,
            voting_limit_date,
            user_creator
        } = request.body;

        const eventsRepository = new EventsRepository();
        const createEvent = new CreateEventsService(eventsRepository);

        const event = createEvent.execute({
            name,
            description,
            voting_limit_date,
            user_creator
        })

    }

    public async show(request: Request, response: Response){
        const current_user = request.body;

        const eventsRepository = new EventsRepository();
        const listEvent = new ListEventService(eventsRepository);

        const events = listEvent.execute({current_user});
        
    }
}

export default EventsController;