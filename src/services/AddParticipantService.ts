import { injectable, inject } from 'tsyringe';

import Participant from '@infra/typeorm/entities/Participants';
import IParticipantsRepository from '../repositories/IParticipantsRepository';

interface Irequest{
    event_id:string,
    user_id:string
}

@injectable()
class AddParticipantService{
  constructor (
    @inject('ParticipantsRepository')
    private participantsRepository: IParticipantsRepository
  ) { }

  public async execute( {event_id , user_id}:Irequest): Promise<Participant> {  

    const participant = await this.participantsRepository.create({event_id,user_id})

    return participant;
  }
}

export default AddParticipantService;