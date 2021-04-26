import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Event from '../infra/typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

interface IRequest {
  latitude: string;
  longitude: string;
  radius: number;
}

@injectable()
class ListNearbyEventService {
  constructor (
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository
  ) { }

  public async execute({ latitude, longitude, radius }: IRequest): Promise<Event[]> {
    let events = await this.eventsRepository.findNearby(latitude, longitude, radius);

    return classToClass(events);
  }
}

export default ListNearbyEventService;