import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import envConfig from '../../../config/v1/env/env.config';
import config from '../../../config';
import User from '../../../models/v1/users/user';
envConfig();

const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token)
      return res.status(StatusCodes.UNAUTHORIZED).json({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "The token wasn't attached to the request",
      });
    const decodedToken = jwt.verify(
      token,
      config()['jwt'].secret
    ) as JwtPayload;
    const user = await User.findByPk(decodedToken.sub);
    if (!user) throw new Error(`The user #${decodedToken.sub} doesn't exist`);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      message: 'The token is not valid',
    });
  }
};

export default verifyToken;
