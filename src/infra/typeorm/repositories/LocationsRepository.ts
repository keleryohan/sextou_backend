import {getRepository, Repository, Raw} from 'typeorm';

import Location from '../entities/Location';

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
    const location = await this.ormRepository
      .createQueryBuilder('')
      .select(['id', 'description','latitude', 'longitude' , 'ST_Y(location) AS latitude', 'ST_X(location) AS longitude'])
      .where(`id = ${id}`)
      .getOne();
    
      return location as Location;
  }
}

export default LocationsRepository;