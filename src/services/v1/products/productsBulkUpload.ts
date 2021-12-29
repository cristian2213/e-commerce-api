import { Request, response, Response } from 'express';
import { createReadStream } from 'fs';
import csv from 'csv-parser';
import validator from 'validator';
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { errorsHandler } from '../../../helpers/v1/handlers/errorsHandler';
import { ProductsBulkUpload } from '../../../types/v1/products/CSVFileBulkUpload';
import Product from '../../../models/v1/user/product';
import db from '../../../config/v1/db/databae.config';

enum UploadTypes {
  CSVFILE = 'csvFile',
  XLSXFILE = 'xlsxFile',
  TXTFILE = 'txtFile',
}

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

  reader
    .pipe(
      csv({
        mapHeaders: ({ header }) => header.toLowerCase().trim(),
      })
    )
    .on('headers', (headers: string[]) => {
      const requiredFields = [
        {
          inputType: 'text',
          label: 'Name',
        },
        {
          inputType: 'text',
          label: 'Title',
        },
        {
          inputType: false,
          element: 'editor',
          label: 'Description',
        },
        {
          inputType: 'number',
          label: 'Name',
        },
        {
          inputType: 'number',
          label: 'Stock',
        },
      ];
      return res.status(StatusCodes.OK).json({
        requiredFields,
        headerOptions: headers,
        filePath: file.path,
      });
    })
    .on('error', (err: Error) => {
      const message =
        err.message.length > 150 ? err.message.substring(0, 150) : err.message;
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ statusCode: StatusCodes.BAD_REQUEST, message });
    });
};

const productsBulkUpload = (req: Request, res: Response) => {
  try {
    const { uploadingType } = req.body;
    switch (true) {
      case uploadingType === UploadTypes.CSVFILE:
        readCSVFile(req, res);
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

const readCSVFile = (req: Request, res: Response) => {
  const { filePath } = req.body;
  const reader = createReadStream(filePath, {
    encoding: 'utf-8',
  });
  const data = [] as ProductsBulkUpload[];

  reader
    .pipe(
      csv({
        mapHeaders: ({ header }) => {
          return validator.escape(header).trim().toLowerCase();
        },

        mapValues: ({ header, value }) => {
          const column = header.toLowerCase();
          const sanitizeValue = validator.escape(value).trim().toLowerCase();
          if (column === 'price' || column === 'stock')
            return parseInt(sanitizeValue);
          return sanitizeValue;
        },
      })
    )
    .on('data', (product) => {
      data.push(product);
    })
    .on('end', () => {
      req.body.products = data;
      CSVFileProductsValidate(req, res);
    })
    .on('error', (err: Error) => {
      const message =
        err.message.length > 150 ? err.message.substring(0, 150) : err.message;
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ statusCode: StatusCodes.BAD_REQUEST, message });
    });
};

const CSVFileProductsValidate = async (req: Request, res: Response) => {
  const successfulUploads = [];
  const failedUploads = [];
  const { products, productData: matchColumns, userId } = req.body;

  const validationSchema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    title: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(20).max(5000).required(),
    price: Joi.number().integer().positive().required(),
    stock: Joi.number().integer().positive().min(1).required(),
  });

  let position: number = 1;
  const lastPosition: number = await Product.max('position', {
    where: {
      userId,
    },
  });

  if (lastPosition) position += lastPosition;
  console.log(lastPosition);
  for (let i = 0; i < products.length; i++) {
    try {
      const alignKeys = {
        name: products[i][matchColumns.name],
        title: products[i][matchColumns.title],
        description: products[i][matchColumns.description],
        price: products[i][matchColumns.price],
        stock: products[i][matchColumns.stock],
      };

      const product = await validationSchema.validateAsync(alignKeys);
      product['position'] = position;
      product['userId'] = userId;
      successfulUploads.push(product);
      position++;
    } catch (error: any) {
      const {
        message,
        path,
        context: { value },
      } = error.details[0];
      const errorObject = {
        productRow: i + 2,
        column: path[0],
        value,
        message,
      };
      failedUploads.push(errorObject);
    }
  }
  req.body.validation = { failedUploads, successfulUploads };
  CSVFileProductsUpload(req, res);
};

const CSVFileProductsUpload = async (req: Request, res: Response) => {
  const { failedUploads, successfulUploads } = req.body.validation;
  let transaction: any;
  try {
    transaction = await db.transaction();
    await Product.bulkCreate(successfulUploads, {
      transaction,
    });
    await transaction.commit();
  } catch (error) {
    console.log(error);
    await transaction.rollback();
  }

  return res.json({
    successfulUploads,
    failedUploads,
  });
  //  Create log the erros for showing in the dashboard
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
