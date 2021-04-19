import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import CreateEventsService from '@services/CreateEventService';
import ListEventService from '@services/ListEventService';
import ChangeInvitationCodeService from '@services/ChangeInvitationCodeService'

import ICoordinate from '@dtos/ICoordinateDTO';

class EventsController {
    public async updateInvitationCode(request: Request, response: Response): Promise<Response>{
        const {event_id} = request.body;
        const updateEvent = container.resolve(ChangeInvitationCodeService);

        const updatedCode = await updateEvent.execute(event_id);

        return response.json(updatedCode);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {
            name,
            description,
            voting_limit_date,
            coordinates,
            schedules,
            is_public
        } = request.body;
        
        let is_public_normalized = is_public.trim().toLowerCase();
        let is_public_parsed = is_public_normalized === 'true' || is_public_normalized === '1';

        const schedules_formated: Date[] = (schedules as string[]).map(schedule => {
            return parseISO(schedule);
        });

        const createEvent = container.resolve(CreateEventsService);

        const { event, schedules:schedule_list } = await createEvent.execute({
            name,
            description,
            voting_limit_date,
            coordinates: coordinates as ICoordinate[],
            schedules: schedules_formated,
            is_public: is_public_parsed,
            created_by: request.user.id
        });

        return response.json({ event, schedules: schedule_list });
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const listEvent = container.resolve(ListEventService);

        const events = await listEvent.execute({user_id: request.user.id});
        
        return response.json(events);
    }
}

export default EventsController;