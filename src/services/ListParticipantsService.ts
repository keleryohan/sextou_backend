import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  event_id: string;
}

@injectable()
class ListParticipantsService {
  constructor (
    @inject('EventsRepository')
    private usersRepository: IUsersRepository
  ) { }

  public async execute({ event_id }: IRequest): Promise<User[]> {
    let users = await this.usersRepository.findParticipants(event_id);

    return classToClass(users);
  }
}

export default ListParticipantsService;