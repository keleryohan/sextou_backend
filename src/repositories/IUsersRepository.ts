import User from '../entities/User';

export default interface IUsersRepository{
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<void>;
}