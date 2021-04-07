import { injectable, inject } from 'tsyringe';

import User from '@infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '@container/providers/HashProvider/models/IHashProvider';
import AppError from '@errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute({ name, email, password }: IRequest): Promise<User> {  

    const alreadyUser = await this.usersRepository.findByEmail(email);

    if (alreadyUser) {
      throw new AppError("Email já utilizado");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      password: hashedPassword,
      email,
    });

    return user;
  }
}

export default CreateUserService;