import { Repository, getRepository } from 'typeorm';

import ICreateVotingDTO from '@dtos/ICreateVotingDTO';
import IVotingsRepository from '@repositories/IVotingsRepository';

import Voting from '../entities/Voting';
import Location from '@infra/typeorm/entities/Location';

class VotingsRepository implements IVotingsRepository {
  private ormRepository: Repository<Voting>;

  constructor () {
    this.ormRepository = getRepository(Voting);
  }

  public async create(data: ICreateVotingDTO): Promise<Voting> {
    const voting = this.ormRepository.create(data);

    await this.ormRepository.save(voting);

    return voting;
  }
  
}

export default VotingsRepository;