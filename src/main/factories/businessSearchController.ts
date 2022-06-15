import { BusinessSearchController } from '../../presentation/controller/businessSearchController';
import { Controller } from '../../presentation/contracts/controller';

export const makeLoadBusinessSearchController = (): Controller => {
  const businessSearchController = new BusinessSearchController();
  return businessSearchController;
};
