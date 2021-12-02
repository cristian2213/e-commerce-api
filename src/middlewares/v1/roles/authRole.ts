import { Response, NextFunction } from 'express';
import { Roles } from './../../../helpers/v1/roles/roles';
import { StatusCodes } from 'http-status-codes';

export const isCustomer = (req: any, res: Response, next: NextFunction) => {
  const roles = req.user.roles;
  for (const role of roles) {
    if (role === Roles.CUSTOMER) {
      return next();
    }
  }
  return res.status(StatusCodes.FORBIDDEN).json({
    statusCode: StatusCodes.FORBIDDEN,
    message: 'Your user does not have permissions to execute this action',
  });
};

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  const roles = req.user.roles;
  for (const role of roles) {
    if (role === Roles.ADMIN) {
      return next();
    }
  }
  return res.status(StatusCodes.FORBIDDEN).json({
    statusCode: StatusCodes.FORBIDDEN,
    message: 'Your user does not have permissions to execute this action',
  });
};

export const isDealer = (req: any, res: Response, next: NextFunction) => {
  const roles = req.body.user.roles;
  for (const role of roles) {
    if (role === Roles.DEALER) {
      return next();
    }
  }
  return res.status(StatusCodes.FORBIDDEN).json({
    statusCode: StatusCodes.FORBIDDEN,
    message: 'Your user does not have permissions to execute this action',
  });
};
