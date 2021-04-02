
import User from '../entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor (
    private usersRepository: IUsersRepository
  ) { }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    /* TODO: 
      - Verificar se existe user com esse email ?
      - Validar se a senha é muita curta ou muito simples OK
      - Salvar usuario ?
    */
    // if (password.length < 7) {
      
    // }
    
    const alreadyUser = await this.usersRepository.findByEmail("");

    if (alreadyUser) {
      throw new Error("");
    }

    const user = new User({
      name,
      password,
      email,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;