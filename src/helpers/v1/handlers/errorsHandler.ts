import { Response, Request } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const errorsHandler = (
  _req: Request,
  res: Response,
  error: any,
  msg?: string
): object => {
  console.log(error);
  const errorCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
  return res.status(errorCode).json({
    statusCode: errorCode,
    message: msg ? msg : ReasonPhrases.INTERNAL_SERVER_ERROR,
  });
};
