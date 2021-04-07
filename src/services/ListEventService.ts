import Event from '../entities/Event';
import User from '@entities/User';
import IEventsRepository from '../repositories/IEventsRepository';


interface IRequest {
    current_user: User;
  }

  class ListEventService {
    constructor (
      private eventsRepository: IEventsRepository
    ) { }

    public async execute({ current_user }: IRequest): Promise<Event[]> {

    let events = await this.eventsRepository.findByUser(current_user);

    return events;

    }

  }

  export default ListEventService;