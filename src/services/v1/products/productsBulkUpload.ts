import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { errorsHandler } from '../../../helpers/v1/handlers/errorsHandler';
import UploadTypes from '../../../helpers/v1/products/productsUploadTypes';
import CSVBulkUpload from './CSVBulkUpload';

// STEP 01
const productsBulkUploadValidation = async (req: Request, res: Response) => {
  const { file } = req;
  if (!file)
    return res.status(StatusCodes.BAD_REQUEST).json({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'File not allowed, only (.csv) file',
    });
  try {
    const { uploadingType } = req.body;
    switch (true) {
      case uploadingType === UploadTypes.CSVFILE:
        CSVBulkUpload.validateCSVFile(req, res);

        break;

      case uploadingType === UploadTypes.XLSXFILE:
        break;

      case uploadingType === UploadTypes.TXTFILE:
        break;
    }
  } catch (error: any) {
    errorsHandler(req, res, error, error.message);
  }
};

// STEP 02
const productsBulkUpload = (req: Request, res: Response) => {
  try {
    const { uploadingType } = req.body;
    switch (true) {
      case uploadingType === UploadTypes.CSVFILE:
        CSVBulkUpload.readCSVFile(req, res);
        break;

      case uploadingType === UploadTypes.XLSXFILE:
        break;

      case uploadingType === UploadTypes.TXTFILE:
        break;
    }
  } catch (error) {
    errorsHandler(req, res, error);
  }
};

export default {
  productsBulkUploadValidation,
  productsBulkUpload,
};

// const validateCSVFile = (req: Request, res: Response) => {
//   const file = req.file as Express.Multer.File;
//   const reader = createReadStream(file.path, {
//     encoding: 'utf-8',
//   });
//   reader.on('data', (stream) => {
//     console.log(stream);
//   });
//   reader.on('end', () => {
//     return res.status(StatusCodes.OK).json({
//       statusCode: StatusCodes.CREATED,
//       info: {
//         createdProducts: 0,
//         faildedProducts: 0,
//       },
//     });
//   });
// };
