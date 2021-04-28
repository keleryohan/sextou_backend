import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '@repositories/IUsersRepository';
import UsersRepository from '@infra/typeorm/repositories/UsersRepository';

import IEventsRepository from '@repositories/IEventsRepository';
import EventsRepository from '@infra/typeorm/repositories/EventsRepository';

import ILocationsRepository from '@repositories/ILocationsRepository';
import LocationsRepository from '@infra/typeorm/repositories/LocationsRepository';

import ISchedulesRepository from '@repositories/ISchedulesRepository';
import SchedulesRepositoy from '@infra/typeorm/repositories/SchedulesRepository';

import IParticipantsRepository from '@repositories/IParticipantsRepository';
import ParticipantsRepository from '@infra/typeorm/repositories/ParticipantsRepository';

import IVotingsRepository from '@repositories/IVotingsRepository'
import VotingsRepository from '@infra/typeorm/repositories/VotingsRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IEventsRepository>(
  'EventsRepository',
  EventsRepository
);

container.registerSingleton<ILocationsRepository>(
  'LocationsRepository',
  LocationsRepository
);
container.registerSingleton<ISchedulesRepository>(
  'SchedulesRepository',
  SchedulesRepositoy
)
container.registerSingleton<IParticipantsRepository>(
  'ParticipantsRepository',
  ParticipantsRepository
)
container.registerSingleton<IVotingsRepository>(
  'VotingsRepository',
  VotingsRepository
)