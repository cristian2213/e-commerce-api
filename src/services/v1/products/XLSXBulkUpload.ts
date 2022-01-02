import { Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import XLSX from 'xlsx';
import ProductsBulkUploadService from './productsBulkUpload';

// 01 HEADERS VALIDATE
const validateXLSXFile = (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;
  req.body.filePath = file.path;

  try {
    ProductsBulkUploadService.checkFile(req, res);
  } catch (error: any) {
    return res.status(StatusCodes.NOT_FOUND).json({
      statusCode: ReasonPhrases.NOT_FOUND,
      onmessage: error.message,
    });
  }

  const workbook = XLSX.readFile(file.path);
  const firstSheet = workbook.SheetNames[0]; // return sheet name 🧾
  const worksheet = workbook.Sheets[firstSheet]; // return work sheet
  const columns = worksheet['!ref'];

  if (!columns)
    return res.status(StatusCodes.BAD_REQUEST).json({
      statusCode: StatusCodes.BAD_REQUEST,
      message: "File doesn't have content.",
    });

  const lastColumn = columns.trim().split(':')[1]; // A1:E10

  // if lastColumn.length > 3 = lastColumn > Column(X)
  if (lastColumn.length > 3)
    return res.status(StatusCodes.BAD_REQUEST).json({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'The column limit per file should be 26 from column A to Z.',
    });

  const row = 1;
  const headers = [];
  // get letters from A to Z
  for (let i = 65; i <= 90; i++) {
    const coordinates = String.fromCharCode(i) + row;
    const cellData = worksheet[coordinates];
    if (cellData === undefined) continue;
    headers.push({ value: cellData.v, coordinates });
  }

  return res.json({
    headers,
  });
};
// 02 READ FILE
/*
  // const reader = createReadStream(file.path, {
  //   encoding: 'utf-8',
  // });

  // res.setHeader('Content-Type', 'application/vnd.ms-excel');
  // res.setHeader('Content-Disposition', 'inline');

  // return reader.pipe(res);
*/

// 03 VALIDATE PRODUCT DATA
// 04 MAKE BULKING UPLOAD

export default {
  validateXLSXFile,
};
