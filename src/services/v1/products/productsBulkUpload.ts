import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import csv from 'csv-parser';
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
        validateCSVFile(req, res);
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

const validateCSVFile = (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;
  const reader = createReadStream(file.path, {
    encoding: 'utf-8',
  });
  const results: any = [];
  // const data: any = [];
  // reader.on('data', (stream) => {
  //   console.log(stream);
  //   data.push(stream);
  // });
  // reader.on('end', () => {
  //   console.log(file);
  //   console.log(data);
  //   return res.status(StatusCodes.OK).json({
  //     statusCode: StatusCodes.CREATED,
  //     info: {
  //       createdProducts: 0,
  //       faildedProducts: 0,
  //     },
  //   });
  // });

  reader
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.CREATED,
        info: {
          createdProducts: 0,
          faildedProducts: 0,
        },
      });
    });
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

export default {
  productsBulkUpload,
};
