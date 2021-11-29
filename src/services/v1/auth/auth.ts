import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import envConfig from '../../../config/v1/env/env.config';
import config from '../../../config';
import { PayloadToken } from '../../../types/v1/jwt/jwt';
import UserService from '../user/user';
import { Roles } from '../../../helpers/v1/roles/roles';

envConfig();

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;
    let user: any = {
      name,
      email,
      password,
      role,
    };
    switch (role) {
      case Roles.ADMIN:
        user = await UserService.createUser(user);
        break;

      case Roles.CUSTOMER:
        user = await UserService.createUser(user);
        break;

      case Roles.DEALER:
        user = await UserService.createUser(user);
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
    console.log(error);
  }
};

const generateJWT = (payload: PayloadToken): string => {
  const token: string = JWT.sign(payload, config()['jwt'].secret as string, {
    expiresIn: '1h',
  });
  return token;
};

export default { signUp };
