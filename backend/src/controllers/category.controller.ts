import { Response } from 'express';
import StatusCodes from 'http-status-codes';

import { logger, CategoryService } from '@services';

export const getAllCategories = async (_req: any, res: Response) => {

  try {
    const categories = await CategoryService.findAll();
    return res.status(StatusCodes.OK).send(categories);
  } catch (error) {
    logger.error(`getAllCategories: ${error}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: true, message: 'Internal server error.' });
  }
};
