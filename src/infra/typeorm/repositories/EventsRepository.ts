import {getRepository, Repository} from 'typeorm';

import Event from '@infra/typeorm/entities/Event';
import User from '@infra/typeorm/entities/User';
import IEventsRepository from '@repositories/IEventsRepository';
import ICreateEventDTO from '@dtos/ICreateEventDTO';

class EventsRepository implements IEventsRepository {
    private ormRepository: Repository<Event>;

    constructor() {
        this.ormRepository = getRepository(Event);
    }

    public async findByUser(user_id: string): Promise<Event[]> {
        let events = await this.ormRepository.find({
            where: {created_by: user_id },
            relations: ['created_by_user', 'chosen_location', 'chosen_schedule'],
        });

        return events;
    }

    public async create(data: ICreateEventDTO): Promise<Event> {
        console.log(data);
        const event = this.ormRepository.create(data);

        await this.ormRepository.save(event);

        return event;
    }

    public async save(event: Event): Promise<Event>{
        return this.ormRepository.save(event);
    }
}

export default EventsRepository;