import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Event from '../infra/typeorm/entities/Event';
import User from '../infra/typeorm/entities/User';
import IEventsRepository from '../repositories/IEventsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListEventService {
  constructor (
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository
  ) { }

  public async execute({ user_id }: IRequest): Promise<Event[]> {
    let events = await this.eventsRepository.findByUser(user_id);

    return classToClass(events);
  }
}

export default ListEventService;