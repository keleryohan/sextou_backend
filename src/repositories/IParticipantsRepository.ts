import Participant from '@infra/typeorm/entities/Participants';

import ICreateParticipantDTO from '../dtos/ICreateParticipantDTO';

interface IParticipantsRepository {
  create(data: ICreateParticipantDTO): Promise<Participant>;
}

export default IParticipantsRepository;