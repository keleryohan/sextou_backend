import { Repository, getRepository } from 'typeorm';

import User from '../entities/User';
import IUsersRepository from '@repositories/IUsersRepository';

import ICreateUserDTO from '@dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor () {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
    });

    return user;
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