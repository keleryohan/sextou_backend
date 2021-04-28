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

    public async findByEventAndUser(event_id: string, user_id:string): Promise<Participant | undefined>{
      const participant = await this.ormRepository.findOne({
        where: { event_id, user_id }
      });

      return participant;
    }
}

export default ParticipantsRepository;