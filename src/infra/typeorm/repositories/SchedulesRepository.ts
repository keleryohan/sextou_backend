import {getRepository, Repository} from 'typeorm';

import Schedule from '../entities/Schedule';
import Voting from '../entities/Voting';

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

  public async getVotedSchedule(event_id: string): Promise<Schedule | undefined> {
    const { schedule_id:id } = await getRepository(Voting)
      .createQueryBuilder('votes')
      .select(['schedule.id', 'COUNT(schedule.id) as schedule_amount_voting'])
      .leftJoin(Schedule, 'schedule',"schedule.id = votes.schedule_id")
      .where(`schedule.event_id='${event_id}'`)
      .groupBy('schedule.id')
      .orderBy('schedule_amount_voting', 'DESC')
      .getRawOne();

      if (!id) {
        return undefined;
      }

      const schedule = await this.ormRepository.findOne({ id });

      return schedule as Schedule | undefined;
  }
  
}

export default SchedulesRepositoy;