import User from '@infra/typeorm/entities/User';

import ICreateUserDTO from '@dtos/ICreateUserDTO';

export default interface IUsersRepository{
  findByEmail(email: string): Promise<User | undefined>;
  findParticipants(eventID: string): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<void>;
}