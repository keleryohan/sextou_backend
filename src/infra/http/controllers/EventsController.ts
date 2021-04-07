import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateEventsService from '@services/CreateEventService';
import ListEventService from '@services/ListEventService';

class EventsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const {
            name,
            description,
            voting_limit_date,
        } = request.body;

        const createEvent = container.resolve(CreateEventsService);

        const event = await createEvent.execute({
            name,
            description,
            voting_limit_date,
            created_by: request.user.id
        });

        return response.json(event);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const listEvent = container.resolve(ListEventService);

        const events = await listEvent.execute({user_id: request.user.id});
        
        return response.json(events);
    }
}

export default EventsController;