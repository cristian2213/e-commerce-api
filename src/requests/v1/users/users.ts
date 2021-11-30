import { Request, Response, NextFunction } from 'express';
import validationHandler from '../../../helpers/v1/handlers/validationHandler';
import { body, param } from 'express-validator';
import { signUpReq } from '../auth/authRequests';
import { Roles } from '../../../helpers/v1/roles/roles';
import UsersService from '../../../services/v1/users/users';

export const createUserReq = signUpReq;

export const getUserReq = [
  param('id')
    .exists()
    .withMessage('The id param is required')
    .bail()
    .toInt()
    .withMessage('The id param is invalid'),
  (req: Request, res: Response, next: NextFunction) => {
    validationHandler(req, res, next);
  },
];

export const updateUserReq = [
  param('id')
    .exists()
    .withMessage('The id param is required')
    .bail()
    .toInt()
    .withMessage('The id param is invalid'),

  body('name').optional({ checkFalsy: true }).trim().escape(),

  body('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('The email field is invalid')
    .bail()
    .trim()
    .escape(),

  body('password')
    .optional({ checkFalsy: true })
    /* 
      minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,
    */
    .isStrongPassword()
    .withMessage(
      'The password field must have a minimum of 8 characters, a minimum of 1 lowercase, a minimum of 1 uppercase, 1 number and 1 symbol'
    )
    .bail()
    .trim()
    .escape(),
];

export const deleteUserReq = [
  param('id')
    .exists()
    .withMessage('The id param is required')
    .bail()
    .toInt()
    .withMessage('The id param is invalid'),
];
