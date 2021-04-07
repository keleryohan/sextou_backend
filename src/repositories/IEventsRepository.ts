import Event from '../entities/Event';
import User from '../entities/User';

export default interface IEventsRepository{
    findByUser(user: User): Promise<Event[] | undefined>;
    save(event: Event): Promise<Event | undefined>;
  }