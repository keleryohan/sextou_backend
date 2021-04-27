import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Event from '../infra/typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

interface IRequest {
  event_id: string;
}

@injectable()
class ListEventByIdService {
  constructor (
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository
  ) { }

  public async execute({ event_id }: IRequest): Promise<Event|undefined> {
    let events = await this.eventsRepository.findById(event_id);

    return classToClass(events);
  }
}

export default ListEventByIdService;