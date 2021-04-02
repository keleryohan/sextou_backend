import User from '@entities/User';
import IUsersRepository from '@repositories/IUsersRepository';
//implementação, integração com o banco

let users:User[] = [];

class UsersRepository implements IUsersRepository {
  public async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = users.find(user => user.email == email);

    if (foundUser) {
      return foundUser;
    } 
    return undefined;
  }

  public async save(user: User): Promise<void> {
    users.push(user);
  }
}

export default UsersRepository;