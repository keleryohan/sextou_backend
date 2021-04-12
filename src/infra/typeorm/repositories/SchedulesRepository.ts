import {getRepository, Repository} from 'typeorm';

import Schedule from '../entities/Schedule';

import ISchedulesRepository from '@repositories/ISchedulesRepository';

import ICreateScheduleDTO from '@dtos/ICreateScheduleDTO';

class SchedulesRepositoy implements ISchedulesRepository {
  private ormRepository: Repository<Schedule>;

  constructor () {
    this.ormRepository = getRepository(Schedule);
  }

  public async create(data:ICreateScheduleDTO): Promise<Schedule> {    
    const schedule = this.ormRepository.create(data);
    
    await this.ormRepository.save(schedule);

    return schedule;
  }

  public async save(schedule: Schedule): Promise<Schedule>{
    return this.ormRepository.save(schedule);
  }
}

export default SchedulesRepositoy;