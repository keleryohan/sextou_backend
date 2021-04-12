import { injectable, inject } from 'tsyringe';

import Event from '../infra/typeorm/entities/Event';
import Location from '../infra/typeorm/entities/Location';
import Schedule from '../infra/typeorm/entities/Schedule';
import IEventsRepository from '../repositories/IEventsRepository';
import ILocationsRepository from '../repositories/ILocationsRepository';
import ISchedulesRepository from '../repositories/ISchedulesRepository';
import ICoordinate from '../dtos/ICoordinateDTO';

interface IRequest {
  name: string;
  description: string;
  voting_limit_date: Date;
  created_by: string;
  coordinates: ICoordinate[];
  is_public: boolean;
  schedules: Date[];
}

interface IResponse {
  event: Event,
  schedules: Schedule[]
}

@injectable()
class CreateEventService {
  constructor (
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('LocationsRepository')
    private locationsRepository: ILocationsRepository,

    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,

  ) { }
  
  public async execute({ name, description, voting_limit_date, created_by, coordinates, is_public, schedules }: IRequest): Promise<IResponse> {
      //console.log(created_by);
      const event = await this.eventsRepository.create({ 
        name, 
        created_by, 
        description, 
        voting_limit_date,
        is_public
      });

      const createLocationsPromises = coordinates.map(coordinate => {
        return this.locationsRepository.create({
          event_id: event.id,
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          description: coordinate.description
        });
      })
      
      const locations = await Promise.all(createLocationsPromises);

      const createSchedulesPromises = schedules.map(schedule => {
        return this.schedulesRepository.create({
          date: schedule,
          event_id: event.id
        })
      })

      const schedule_list = await Promise.all(createSchedulesPromises);

      return {
        event,
        schedules: schedule_list
      };
  }
}

export default CreateEventService;