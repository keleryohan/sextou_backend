import Event from '@entities/Event';
import User from '@entities/User';
import IEventsRepository from '@repositories/IEventsRepository';
import { getRepository, Repository} from 'typeorm';

//implementação, integração com o banco

class EventsRepository implements IEventsRepository {
    private ormRepository: Repository<Event>;

    constructor() {
        this.ormRepository = getRepository(Event);
    }

    public async findByUser(this_user: User): Promise<Event[] | undefined>{
        //let events: Event[];

        let events = await this.ormRepository.find({
            where: {user : this_user }
          })

        

        return events;
    }

    public async save(event: Event): Promise<Event | undefined>{
        return this.ormRepository.save(event);

    }

}

export default EventsRepository;