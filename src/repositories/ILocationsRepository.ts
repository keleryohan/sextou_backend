import Location from '@infra/typeorm/entities/Location';

import ICreateLocationDTO from '../dtos/ICreateLocationDTO';

interface ILocationsRepository {
  create(data: ICreateLocationDTO): Promise<Location>;
  findById(id: string): Promise<Location | undefined>;
}

export default ILocationsRepository;