import { BusinessParams } from '../entities/businessParams';
import { BusinessModel } from '../models/business';

export default interface BusinessSearchRepository {
    search(params: BusinessParams): Promise<BusinessModel>;
}
