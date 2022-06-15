import { Business } from '../../core/entities/business';

export class BusinessViewModel {
  total?: number | undefined;
  businesses: Business[] | undefined;

  static map(entity: Business): BusinessViewModel {
    return {
      businesses: [entity]
    };
  }
}
