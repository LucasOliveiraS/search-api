import { Paramemeters, BusinessParams } from '../entities/businessParams';
import { Business } from '../entities/business';
import SearchRepository from '../contracts/businessSearchRepository';

export class BusinessSearch {
  searchRepository: SearchRepository;

  constructor(searchRepository: SearchRepository) {
    this.searchRepository = searchRepository;
  }

  execute(params: Paramemeters): Promise<Business> {
    const searchParams = new BusinessParams(params);
    return this.searchRepository.search(searchParams);
  }
}
