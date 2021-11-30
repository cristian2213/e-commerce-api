import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import envConfig from '../../../config/v1/env/env.config';
import config from '../../../config';
import { PayloadToken } from '../../../types/v1/jwt/jwt';
import UsersService from '../users/users';
import { Roles } from '../../../helpers/v1/roles/roles';
import { errorsHandler } from '../../../helpers/v1/handlers/errorsHandler';

envConfig();

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.body;
    req.body.signUp = true;
    let user: any;
    switch (role) {
      case Roles.ADMIN:
        user = await UsersService.createUser(req, res);
        break;

      case Roles.CUSTOMER:
        user = await UsersService.createUser(req, res);
        break;

      case Roles.DEALER:
        user = await UsersService.createUser(req, res);
        break;
    }

    const token = generateJWT({
      sub: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
    });
    return res.status(StatusCodes.CREATED).json({ user, token });
  } catch (error) {
    errorsHandler(req, res, error);
  }
};

const generateJWT = (payload: PayloadToken): string => {
  const token: string = JWT.sign(payload, config()['jwt'].secret as string, {
    expiresIn: '1h',
  });
  return token;
};

export default { signUp };
