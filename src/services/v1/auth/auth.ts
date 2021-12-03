import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import envConfig from '../../../config/v1/env/env.config';
import config from '../../../config';
import { PayloadToken } from '../../../types/v1/jwt/jwt';
import UsersService from '../users/users';
import { Roles } from '../../../helpers/v1/roles/roles';
import { errorsHandler } from '../../../helpers/v1/handlers/errorsHandler';
import { verify } from 'argon2';

envConfig();

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  console.log('passed!');
  try {
    const { roles } = req.body;
    req.body.signUp = true;
    const user: any = await UsersService.createUser(req, res);
    // switch (roles) {
    //   case Roles.ADMIN:
    //     user = await UsersService.createUser(req, res);
    //     break;

    //   case Roles.CUSTOMER:
    //     user = await UsersService.createUser(req, res);
    //     break;

    //   case Roles.DEALER:
    //     user = await UsersService.createUser(req, res);
    //     break;
    // }

    const token = generateJWT({
      sub: user.id,
      roles: user.roles,
      name: user.name,
      email: user.email,
    });
    return res.status(StatusCodes.CREATED).json({ user, token });
  } catch (error) {
    errorsHandler(req, res, error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user: any = await UsersService.findByEmail(email);
    if (!user)
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        statusCode: StatusCodes.NOT_FOUND,
        message: `The e-mail ${email} does not exist`,
      });

    if (!user.emailVerifiedAt)
      return res.status(StatusCodes.UNAUTHORIZED).json({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: `E-mail ${email} hasn't been verified`,
      });

    const match = await comparePasswords(user.password, password);
    if (!match)
      return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: StatusCodes.BAD_REQUEST,
        message: '',
      });

    const payload: PayloadToken = {
      sub: user.id,
      roles: user.roles,
      email: user.email,
      name: user.name,
    };

    const token = generateJWT(payload);
    return res.status(StatusCodes.OK).json({
      user,
      token,
    });
  } catch (error: any) {
    errorsHandler(req, res, error, error.message);
  }
};

const generateJWT = (payload: PayloadToken, ttl = '1h'): string => {
  const token: string = JWT.sign(payload, config()['jwt'].secret as string, {
    expiresIn: ttl,
  });
  return token;
};

const comparePasswords = async (
  hash: string,
  password: string
): Promise<boolean | never> => {
  try {
    if (!hash || !password)
      throw new Error('The hash and password parameters are required');

    const comparison = await verify(hash, password);
    if (!comparison) throw new Error('The passwords are not the same');

    return comparison;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default { signUp, login, generateJWT, comparePasswords };
