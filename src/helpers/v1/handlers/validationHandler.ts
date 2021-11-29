import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

// REVIEW Global validator for adding a global log of requests
const validationHandler = (req: Request, res: Response, next: NextFunction) => {
  const erros = validationResult(req);
  if (!erros.isEmpty())
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: erros.array() });

  next();
};

export default validationHandler;
