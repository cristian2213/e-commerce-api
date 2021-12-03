import { Roles } from './../../../helpers/v1/roles/roles';
import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import UserService from '../../../services/v1/users/users';
import validationHandler from '../../../helpers/v1/handlers/validationHandler';

export const signUpReq = [
  body('name')
    .exists()
    .withMessage('The email field is required')
    .bail()
    .trim()
    .escape(),

  body('email')
    .exists()
    .withMessage('The email field is requierd')
    .bail()
    .isEmail()
    .withMessage('The email field is invalid')
    .bail()
    .custom(async (email: string) => {
      try {
        const user = await UserService.findByEmail(email);
        if (user) throw new Error('The email exists already');
        return true;
      } catch (err: any) {
        throw new Error(err.message);
      }
    })
    .bail()
    .trim()
    .escape(),

  body('password')
    .exists()
    .withMessage('The password field is required')
    .bail()
    /* 
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    */
    .isStrongPassword()
    .withMessage(
      'The password field must have a minimum of 8 characters, a minimum of 1 lowercase, a minimum of 1 uppercase, 1 number and 1 symbol'
    )
    .bail()
    .trim()
    .escape(),

  body('confirmPassword')
    .exists()
    .withMessage('The confirm password firld is required')
    .bail()
    .custom((confirmPassword, { req }) => {
      if (confirmPassword.trim() !== req.body.password.trim())
        throw new Error('Password do not match');
      return true;
    })
    .bail()
    .trim()
    .escape(),

  body('roles')
    .exists()
    .withMessage('The role field is required')
    .bail()
    .isArray()
    .withMessage('The role field must be an array')
    .bail()
    .isIn(Object.values(Roles))
    .withMessage(`Only allowed ${Object.values(Roles).join(', ')}`)
    .bail(),
  // .custom((role: string) => {
  //   const allowedRoles: string[] = Object.values(Roles);
  //   if (!allowedRoles.includes(role))
  //     throw new Error(
  //       'Invalid role, Only allowed' + ' ' + allowedRoles.join(', ')
  //     );
  //   return true;
  // }),
  (req: Request, res: Response, next: NextFunction) => {
    validationHandler(req, res, next);
  },
];

export const loginReq = [
  body('email')
    .exists()
    .withMessage('The email field is required')
    .bail()
    .isEmail()
    .withMessage('The email field is invalid')
    .trim()
    .escape(),

  body('password')
    .exists()
    .withMessage('The password field is required')
    .bail()
    .trim()
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    validationHandler(req, res, next);
  },
];
