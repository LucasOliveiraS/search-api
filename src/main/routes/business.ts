import { Router } from 'express';

import { adaptRoute } from '../adapter/express-router';
import { makeLoadBusinessSearchController } from '../factories/businessSearchController';

export default (router: Router): void => {
  router.post('/search', adaptRoute(makeLoadBusinessSearchController()));
};
