import { Paramemeters } from '../../core/entities/businessParams';
import { BusinessSearch } from '../../core/usecases/businessSearch';
import searchRepositoryRedis from '../../infra/persistence/redis/searchRepository';
import { Controller } from '../contracts/controller';
import { HttpResponse, ok, serverError } from '../contracts/http';
import { BusinessViewModel } from '../view-models/business';

export class BusinessSearchController implements Controller {
  async handle(request: Paramemeters): Promise<HttpResponse<BusinessViewModel>> {
    try {
      console.log(request);
      const searchRepository = new searchRepositoryRedis();
      const search = new BusinessSearch(searchRepository);
      const result = await search.execute(request);
      return ok(BusinessViewModel.map(result));
    } catch (error: any) {
      return serverError(error);
    }
  }
}
