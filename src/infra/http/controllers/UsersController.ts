import { Request, Response } from 'express';

import CreateUserService from '@services/CreateUserService';
import UsersRepository from '@infra/typeorm/repositories/UsersRepository';
//lida com request

class UsersController {
  public async create(request: Request, response: Response) {
    const {
      name,
      email,
      password
    } = request.body;

    const usersRepository = new UsersRepository();

    const createUser = new CreateUserService(usersRepository);

    const user = createUser.execute({
      name,
      email,
      password
    });

    return response.json(user);
  }
}

export default UsersController;