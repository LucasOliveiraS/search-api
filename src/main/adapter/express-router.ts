import { Controller } from '../../presentation/contracts/controller';

import { Request, Response } from 'express';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
    };
    const httpResponse = await controller.handle(request);
    res.status(httpResponse.statusCode).json(httpResponse.data);
  };
};
