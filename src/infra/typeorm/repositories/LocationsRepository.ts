import {getRepository, Repository, Raw} from 'typeorm';

import Location from '../entities/Location';
import Voting from '../entities/Voting';

import ILocationsRepository from '@repositories/ILocationsRepository';

import ICreateLocationDTO from '@dtos/ICreateLocationDTO';

class LocationsRepository implements ILocationsRepository {
  private ormRepository: Repository<Location>;

  constructor () {
    this.ormRepository = getRepository(Location);
  }

  public async create(data:ICreateLocationDTO): Promise<Location> {    
    const location: Location = await this.ormRepository.query(
      'INSERT INTO locations (event_id, description, latitude, longitude, location) ' + 
      'VALUES ($1, $2,$3,$4, ST_SetSRID(ST_MakePoint($5,$6), 4326 ))',
      [data.event_id, data.description, data.latitude, data.longitude ,data.latitude, data.longitude]
    );
    
    return location;
  }

  public async findById(id: string): Promise<Location> {
    const location = await this.ormRepository.findOne({ id });
    
    return location as Location;
  }

  public async getVotedLocation(event_id: string): Promise<Location | undefined> {
    const { locations_id:id } = await getRepository(Voting)
      .createQueryBuilder('votes')
      .select(['locations.id', 'COUNT(locations.id) as locations_amount_voting'])
      .leftJoin(Location, 'locations',"locations.id = votes.location_id")
      .where(`locations.event_id='${event_id}'`)
      .groupBy('locations.id')
      .orderBy('locations_amount_voting', 'DESC')
      .getRawOne();

      if (!id) {
        return undefined;
      }

      const location = await this.findById(id);

      return location as Location | undefined;
  }
}

export default LocationsRepository;