import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import CreateEventsService from '@services/CreateEventService';
import ListEventService from '@services/ListEventService';
import ChangeInvitationCodeService from '@services/ChangeInvitationCodeService'
import ListNearbyEventsService from '@services/ListNearbyEventsService';
import ListEventByIdService from '@services/ListEventByIdService';
import ListEventByInvitationCodeService from '@services/ListEventByInvitationCodeService';

import ICoordinate from '@dtos/ICoordinateDTO';

class EventsController {
    public async updateInvitationCode(request: Request, response: Response): Promise<Response>{
        const {event_id} = request.body;
        const updateEvent = container.resolve(ChangeInvitationCodeService);

        const updatedCode = await updateEvent.execute(event_id);

        return response.json(updatedCode);
    }

    public async getNearby(request: Request, response: Response): Promise<Response>{
        const{latitude, longitude, radius} = request.body;

        const listNearby = container.resolve(ListNearbyEventsService);

        const events = await listNearby.execute({latitude,longitude,radius});

        return response.json(events);

    }

    public async getByInvitationCode(request: Request, response: Response): Promise<Response>{
        const{invitation_code} = request.body;

        const listByCode = container.resolve(ListEventByInvitationCodeService);

        const events = await listByCode.execute({invitation_code});

        return response.json(events);
    }

    public async getById(request: Request, response: Response): Promise<Response>{
        const{event_id} = request.body;

        const listById = container.resolve(ListEventByIdService);

        const event = await listById.execute({event_id});

        return response.json(event);

        
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {
            name,
            description,
            voting_limit_date,
            coordinates,
            schedules,
            is_public=""
        } = request.body;
        
        let is_public_normalized = is_public.trim().toLowerCase();
        let is_public_parsed = is_public_normalized === 'true' || is_public_normalized === '1';

        const schedules_list = JSON.parse(schedules);
        const coordinates_list = JSON.parse(coordinates);

        const schedules_formated: Date[] = (schedules_list as string[]).map(schedule => {
            return parseISO(schedule);
        });

        const createEvent = container.resolve(CreateEventsService);

        const { event, schedules:schedule_list } = await createEvent.execute({
            name,
            description,
            voting_limit_date,
            coordinates: coordinates_list as ICoordinate[],
            schedules: schedules_formated,
            is_public: is_public_parsed,
            created_by: request.user.id,
            imgFilename: request.file.filename
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