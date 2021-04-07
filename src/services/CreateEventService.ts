import Event from '../entities/Event';
import User from '@entities/User';
import IEventsRepository from '../repositories/IEventsRepository';


interface IRequest {
    name: string;
    description: string;
    voting_limit_date: Date;
    user_creator: User;
  }


  class CreateEventService {
    constructor (
      private eventsRepository: IEventsRepository
    ) { }


    public async execute({ name, description, voting_limit_date, user_creator }: IRequest): Promise<Event> {

        const event = new Event(
            {
                name: name,
                description: description,
                votingLimitDate: voting_limit_date,
                user_creator: user_creator
            }
        );

        await this.eventsRepository.save(event);

        return event;


    }
    }

export default CreateEventService;