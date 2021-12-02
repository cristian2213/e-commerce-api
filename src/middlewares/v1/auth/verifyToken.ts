import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import envConfig from '../../../config/v1/env/env.config';
import config from '../../../config';
envConfig();

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.get('Authorization');
    if (!token)
      return res.status(StatusCodes.UNAUTHORIZED).json({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "The token wasn't attached to the request",
      });
    const decodedToken = jwt.verify(token, config()['jwt'].secret);
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
