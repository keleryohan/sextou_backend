import Event from '../infra/typeorm/entities/Event';

import ICreateEventDTO from '@dtos/ICreateEventDTO';

export default interface IEventsRepository{
    findByUser(user_id: string): Promise<Event[]>;
    create(event: ICreateEventDTO): Promise<Event>;
    save(event: Event): Promise<Event>;
  }