import {getRepository, Repository} from 'typeorm';

import ICreateParticipantDTO from '@dtos/ICreateParticipantDTO';
import IParticipantsRepository from '@repositories/IParticipantsRepository';
import Participant from '../entities/Participants';


class ParticipantsRepository implements IParticipantsRepository {
    private ormRepository: Repository<Participant>;

  constructor () {
    this.ormRepository = getRepository(Participant);
  }

    public async create(data: ICreateParticipantDTO): Promise<Participant> {
      const participant = this.ormRepository.create(data);
  
      await this.ormRepository.save(participant);
  
      return participant;
    }
    
    public async save(participant: Participant): Promise<void> {
      this.ormRepository.save(participant);
    }
}

export default ParticipantsRepository;