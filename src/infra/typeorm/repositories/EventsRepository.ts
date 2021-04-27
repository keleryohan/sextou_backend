import {Any, getRepository, Repository} from 'typeorm';
import crypto from 'crypto'

import Event from '@infra/typeorm/entities/Event';
import User from '@infra/typeorm/entities/User';
import IEventsRepository from '@repositories/IEventsRepository';
import ICreateEventDTO from '@dtos/ICreateEventDTO';
import eventsRouter from '@infra/http/routes/events.routes';

type EventId =  { 
    id: string 
}

class EventsRepository implements IEventsRepository {
    private ormRepository: Repository<Event>;

    constructor() {
        this.ormRepository = getRepository(Event);
    }

    public async findByUser(user_id: string): Promise<Event[]> {
        let events = await this.ormRepository.find({
            where: {created_by: user_id },
            relations: [
                'created_by_user', 
                'chosen_location', 
                'chosen_schedule', 
                'locations', 
                'schedules'
            ],
        });

        return events;
    }

    public async findById(event_id: string): Promise<Event | undefined> {
        const event = await this.ormRepository.findOne({
            id: event_id
        })

        return event;
    }

    public async findByInvitationCode(invitation_code: string): Promise<Event | undefined> {
        const event = await this.ormRepository.findOne({
            invitation_code: invitation_code
        })

        return event;
    }

    public async findNearby(latitude:string, longitude: string, radius: number): Promise<Event[]>{

        //todo: testar, adicionar requirimento que o evento tenha um local selecionado
        const nearby_events_id: EventId[] = await getRepository(Event).query(
            `
                SELECT event.id
                FROM events AS event INNER JOIN locations AS location ON event.id=location.event_id
                WHERE ST_Distance(location.location, ST_MakePoint($1,$2)) < $3
            `,
            [latitude, longitude, radius]
        )

        if(!nearby_events_id.length){
            return [];
        }

        let events_id = nearby_events_id.map(event => event['id']);

        const events = await getRepository(Event)
            .createQueryBuilder('event')
            .where('event.id IN (:...event_IDs)', {event_IDs: events_id})
            .getMany();

        return events;
    }


    public async create(data: ICreateEventDTO): Promise<Event> {
        //console.log(data);
        const event = this.ormRepository.create(data);

        // const event = await this.ormRepository.query(
        //     'INSERT INTO events (name,description,voting_limit_date,created_by,location)'+
        //     'VALUES ($1, $2, $3, $4 ,ST_SetSRID(ST_MakePoint($5,$6), 4326 ));',
        //     [data.name,data.description,data.voting_limit_date,data.created_by, data.longitude, data.latitude]
        // )

        await this.ormRepository.save(event);

        return event;
    }

    

    public async updateInvitationCode(event_id: String): Promise<string>{
        let current_date = (new Date()).valueOf().toString();
        const invitation_code = crypto.createHash('sha1').update(current_date).digest('hex');

        await getRepository(Event).createQueryBuilder('event')
        .update(Event)
        .set({ invitation_code: invitation_code})
        .where("id = :id", { id: event_id })
        .execute();

        return invitation_code;

    }

    public async save(event: Event): Promise<Event>{
        return this.ormRepository.save(event);
    }
}

export default EventsRepository;