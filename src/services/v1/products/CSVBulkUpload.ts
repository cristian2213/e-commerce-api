import { Request, Response } from 'express';
import csv from 'csv-parser';
import validator from 'validator';
import { createReadStream, existsSync } from 'fs';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import db from '../../../config/v1/db/databae.config';
import { ProductsBulkUpload } from '../../../types/v1/products/CSVFileBulkUpload';
import Product from '../../../models/v1/user/product';
import productsValidationSchema from '../../../helpers/v1/products/productsValidationSchema';
import ProductsBulkUploadService from './productsBulkUpload';

// STEP 01
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

// STEP 03
const readCSVFile = (req: Request, res: Response) => {
  const { filePath } = req.body;

  try {
    ProductsBulkUploadService.checkFile(req, res);
  } catch (error: any) {
    return res.status(StatusCodes.NOT_FOUND).json({
      statusCode: ReasonPhrases.NOT_FOUND,
      onmessage: error.message,
    });
  }

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

// STEP 04
const CSVFileProductsValidate = async (req: Request, res: Response) => {
  const successfulUploads = [];
  const failedUploads = [];
  const { products, productData: matchColumns, userId } = req.body;

  let position: number = 1;
  const lastPosition: number = await Product.max('position', {
    where: {
      userId,
    },
  });

  if (lastPosition) position += lastPosition;

  for (let i = 0; i < products.length; i++) {
    try {
      const alignKeys = {
        name: products[i][matchColumns.name],
        title: products[i][matchColumns.title],
        description: products[i][matchColumns.description],
        price: products[i][matchColumns.price],
        stock: products[i][matchColumns.stock],
      };

      const validationSchema = productsValidationSchema();

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
  await CSVFileProductsUpload(req, res);
};

// STEP 05
const CSVFileProductsUpload = async (req: Request, res: Response) => {
  const { failedUploads, successfulUploads } = req.body.validation;

  const message =
    'There are no valid products to upload, please check your error log.';
  let resMsg = {
    successfulUploads: successfulUploads.length,
    failedUploads: failedUploads.length,
    message,
  };

  if (successfulUploads.length === 0) {
    // Create errors log
    const log = { id: 1 };
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ ...resMsg, logId: log.id });
  }

  let isSuccessful = true;
  let transaction: any;
  try {
    transaction = await db.transaction();
    await Product.bulkCreate(successfulUploads, {
      transaction,
    });
    await transaction.commit();
  } catch (error) {
    isSuccessful = false;
    await transaction.rollback();
  }

  // CREATE ERROR LOG

  const log = { id: 1 };
  if (!isSuccessful) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      successfulUploads: 0,
      failedUploads: resMsg.successfulUploads + resMsg.failedUploads,
      message: resMsg.message,
      logId: log.id,
    });
  }

  return res.status(StatusCodes.OK).json({
    ...resMsg,
    message: 'Ok',
    logId: log.id,
  });
};

export default {
  validateCSVFile,
  readCSVFile,
};
