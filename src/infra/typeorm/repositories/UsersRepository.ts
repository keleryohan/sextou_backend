import { Repository, getRepository } from 'typeorm';

import User from '../entities/User';
import Participant from '../entities/Participants';
import IUsersRepository from '@repositories/IUsersRepository';

import ICreateUserDTO from '@dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor () {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id }
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
    });

    return user;
  }

  public async findParticipants(eventID: string) : Promise<User[]>{
    const users = await getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect(
        Participant,
        "participant",
        "participant.user_id = user.id"
      )
      .where('participant.event_id = :event_ID', { event_ID: eventID })
      .getMany();

    return users;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<void> {
    this.ormRepository.save(user);
  }
}

export default UsersRepository;