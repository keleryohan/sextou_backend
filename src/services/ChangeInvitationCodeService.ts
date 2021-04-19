import { injectable, inject } from 'tsyringe';

import Event from '@infra/typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class ChangeInvitationCodeService{
  constructor (
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository
  ) { }

  public async execute( event_id : string): Promise<string> {  


    const event = await this.eventsRepository.updateInvitationCode(
      event_id
    )

    return event;

  }
}

export default ChangeInvitationCodeService;