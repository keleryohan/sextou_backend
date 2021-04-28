import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { isAfter } from 'date-fns';

import AppError from '@errors/AppError';

import Event from '../infra/typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';
import ILocationsRepository from '../repositories/ILocationsRepository';
import ISchedulesRepository from '../repositories/ISchedulesRepository';

interface IRequest {
  event_id: string;
}

@injectable()
class ListEventByIdService {
  constructor (
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
    
    @inject('LocationsRepository')
    private locationsRepository: ILocationsRepository,

    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) { }

  public async execute({ event_id }: IRequest): Promise<Event|undefined> {
    let event = await this.eventsRepository.findById(event_id);
    
    if (!event) {
      throw new AppError("Evento não encontrado", 400);
    }

    // Finalizando votação
    if (!event.chosen_location_id && isAfter(Date.now(), event.voting_limit_date)) {
      const locationVoted = await this.locationsRepository.getVotedLocation(event_id);

      if (!locationVoted) {
        throw new AppError("Não foi possível validar votação da localização", 500);
      }

      const scheduleVoted = await this.schedulesRepository.getVotedSchedule(event_id);

      if (!scheduleVoted) {
        throw new AppError("Não foi possível validar votação do horário", 500);
      }

      event.chosen_location_id = locationVoted.id;
      event.chosen_schedule_id = scheduleVoted.id;

      await this.eventsRepository.save(event);
    }

    return classToClass(event);
  }
}

export default ListEventByIdService;