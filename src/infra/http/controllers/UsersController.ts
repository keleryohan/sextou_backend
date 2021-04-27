import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@services/CreateUserService';
import ListParticipantsService from '@services/ListParticipantsService';
import AddParticipantService from '@services/AddParticipantService';


class UsersController {
  public async getParticipants(request:Request, response: Response) : Promise<Response>{
    const{
      event_id
    } = request.body;

    const listParticipants = container.resolve(ListParticipantsService);

    const participants = await listParticipants.execute({event_id})

    return response.json(classToClass(participants));
  }

  public async addParticipant(request:Request, response: Response) : Promise<Response>{
    const { event_id } = request.body;

    const user_id = request.user.id;

    const addParticipants = container.resolve(AddParticipantService);

    const participants = await addParticipants.execute({event_id,user_id});

    return response.json(classToClass(participants));
  }


  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password
    });

    return response.json(classToClass(user));
  }
}

export default UsersController;