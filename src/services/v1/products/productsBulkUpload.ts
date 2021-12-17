import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { errorsHandler } from '../../../helpers/v1/handlers/errorsHandler';

enum UploadTypes {
  CSVFILE = 'csvFile',
  XLSXFILE = 'xlsxFile',
  TXTFILE = 'txtFile',
}

const productsBulkUpload = async (req: Request, res: Response) => {
  const { file } = req;
  if (!file)
    return res.status(StatusCodes.BAD_REQUEST).json({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'File not allowed, only (.csv) file',
    });
  console.log(file);
  try {
    // FIXME Create log the erros for showing in the dashboard
    const { uploadingType } = req.body;
    switch (true) {
      case uploadingType === UploadTypes.CSVFILE:
        break;

      case uploadingType === UploadTypes.XLSXFILE:
        break;

      case uploadingType === UploadTypes.TXTFILE:
        break;
    }

    return res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.CREATED,
      info: {
        createdProducts: 0,
        faildedProducts: 0,
      },
    });
  } catch (error) {
    errorsHandler(req, res, error);
  }
};

export default {
  productsBulkUpload,
};
