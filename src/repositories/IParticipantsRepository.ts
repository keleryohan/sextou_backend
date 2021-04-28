import Participant from '@infra/typeorm/entities/Participants';

import ICreateParticipantDTO from '../dtos/ICreateParticipantDTO';

interface IParticipantsRepository {
  create(data: ICreateParticipantDTO): Promise<Participant>;
  findByEventAndUser(event_id: string, user_id: string): Promise<Participant|undefined>;
}

export default IParticipantsRepository;