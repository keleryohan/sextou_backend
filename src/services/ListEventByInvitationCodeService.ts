import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Event from '../infra/typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

interface IRequest {
    invitation_code: string;
}

@injectable()
class ListEventByInvitationCodeService {
  constructor (
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository
  ) { }

  public async execute({invitation_code} : IRequest): Promise<Event|undefined> {
    let events = await this.eventsRepository.findByInvitationCode(invitation_code); 

    return classToClass(events);
  }
}

export default ListEventByInvitationCodeService;