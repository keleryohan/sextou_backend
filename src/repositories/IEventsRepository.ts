import Event from '../infra/typeorm/entities/Event';

import ICreateEventDTO from '@dtos/ICreateEventDTO';

export default interface IEventsRepository{
    findByUser(user_id: string): Promise<Event[]>;
    findNearby(latitude:string, longitude: string, radius: number): Promise<Event[]>;
    create(event: ICreateEventDTO): Promise<Event>;
    updateInvitationCode(event_id: string): Promise<string>;
    save(event: Event): Promise<Event>;
  }