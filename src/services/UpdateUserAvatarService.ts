import { injectable, inject } from 'tsyringe';

import AppError from '@errors/AppError';
import User from '@infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário tem que estar logado para alterar imagem', 401);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;