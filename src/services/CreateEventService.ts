import { injectable, inject } from 'tsyringe';

import Event from '../infra/typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

interface IRequest {
  name: string;
  description: string;
  voting_limit_date: Date;
  created_by: string;
}

@injectable()
class CreateEventService {
  constructor (
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository
  ) { }
  
  public async execute({ name, description, voting_limit_date, created_by }: IRequest): Promise<Event> {
      console.log(created_by);
      const event = await this.eventsRepository.create({ 
        name, 
        created_by, 
        description, 
        voting_limit_date 
      });

      return event;
  }
}

export default CreateEventService;