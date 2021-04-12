import Schedules from '@infra/typeorm/entities/Schedule';

import ICreateScheduleDTO from '../dtos/ICreateScheduleDTO';

interface ILocationsRepository {
  create(data: ICreateScheduleDTO): Promise<Schedules>;
}

export default ILocationsRepository;