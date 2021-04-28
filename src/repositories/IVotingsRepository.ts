import ICreateVotingDTO from '@dtos/ICreateVotingDTO';

import Voting from '@infra/typeorm/entities/Voting';

interface IVotingsRepository {
  create(data: ICreateVotingDTO): Promise<Voting>;
}

export default IVotingsRepository;