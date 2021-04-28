import Schedule from '@infra/typeorm/entities/Schedule';

import ICreateScheduleDTO from '../dtos/ICreateScheduleDTO';

interface ISchedulesRepository {
  create(data: ICreateScheduleDTO): Promise<Schedule>;
  getVotedSchedule(event_id: string): Promise<Schedule | undefined>;
}

export default ISchedulesRepository;