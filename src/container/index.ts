import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '@repositories/IUsersRepository';
import UsersRepository from '@infra/typeorm/repositories/UsersRepository';

import IEventsRepository from '@repositories/IEventsRepository';
import EventsRepository from '@infra/typeorm/repositories/EventsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IEventsRepository>(
  'EventsRepository',
  EventsRepository
);