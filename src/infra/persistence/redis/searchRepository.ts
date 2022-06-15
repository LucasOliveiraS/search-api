import { BusinessParams } from '../../../core/entities/businessParams';
import SearchRepository from '../../../core/contracts/businessSearchRepository';
import { BusinessModel } from '../../../core/models/business';

export default class searchRepositoryRedis implements SearchRepository {
  search(params: BusinessParams): Promise<BusinessModel> {
    throw new Error('Method not implemented.');
  }
}
