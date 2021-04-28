import { injectable, inject } from 'tsyringe';

import AppError from '@errors/AppError';

import Participant from '@infra/typeorm/entities/Participants';
import IParticipantsRepository from '../repositories/IParticipantsRepository';
import IVotingsRepository from '../repositories/IVotingsRepository';

interface IRequest {
  event_id: string,
  user_id: string,
  location_id: string;
  schedule_id: string;
}

@injectable()
class AddParticipantService{
  constructor (
    @inject('ParticipantsRepository')
    private participantsRepository: IParticipantsRepository,

    @inject('VotingsRepository')
    private votingsRepository: IVotingsRepository
  ) { }

  public async execute({
    event_id , 
    user_id, 
    location_id, 
    schedule_id }: IRequest): Promise<Participant> {  
    let participantAlreadyExist = await this.participantsRepository
      .findByEventAndUser(event_id, user_id);

    if (participantAlreadyExist) {
      throw new AppError("Usuário já votou", 400);
    }

    const participant = await this.participantsRepository.create({
      event_id,
      user_id
    });

    const voting = await this.votingsRepository.create({
      event_id,
      user_id,
      location_id,
      schedule_id
    });

    return participant;
  }
}

export default AddParticipantService;