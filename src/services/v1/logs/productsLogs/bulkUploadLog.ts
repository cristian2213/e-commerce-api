import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, parse, sep, normalize } from 'path';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { errorsHandler } from './../../../../helpers/v1/handlers/errorsHandler';
import { Request, Response } from 'express';
import Log, { LogInstance } from '../../../../models/v1/logs/log';
import generateRandomString from '../../../../helpers/v1/globals/generateRandomString';
import rootPath from '../../../../helpers/v1/paths/rootPath';

const createLog = async (req: Request, res: Response): Promise<LogInstance> => {
  const { failedUploads, successfulUploads } = req.body.validation;
  const { filePath } = req.body;
  try {
    const log = await Log.create({
      logType: 'products',
      successfulUploads: successfulUploads.length,
      failedUploads: failedUploads.length,
      errors: JSON.stringify(failedUploads),
      userId: req.body.userId,
      filePath,
    });
    return log;
  } catch (error: any) {
    return error;
  }
};

const logDownload = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const log = await Log.findByPk(id);

    if (!log)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: ReasonPhrases.NOT_FOUND,
        message: `Log #${id} doesn't exist`,
      });

    const errors = JSON.parse(log.errors);

    if (errors.length === 0)
      return res.status(StatusCodes.NO_CONTENT).json({
        statusCode: ReasonPhrases.NO_CONTENT,
        message: `The log #${id} doesn't have errors for downloading`,
      });

    const savingDir = join(rootPath(), 'storage', 'v1', 'logs', 'products'); // /src
    if (!existsSync(savingDir)) mkdirSync(savingDir, { recursive: true });

    const normalizedPath = join(...log.filePath.split(sep));
    const { dir, name } = parse(normalizedPath.replace('docs', 'logs'));
    const fileToDownload = join(dir, name) + '.txt';

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="' + generateRandomString(12) + '.txt' + '"'
    );

    if (existsSync(fileToDownload)) {
      return res.download(fileToDownload);
    }

    const totalErrors = errors.length;
    const txtFileContent = [];
    for (let i = 0; i < totalErrors; i++) {
      const { productRow, column, value, message } = errors[i];
      const content = `Row: ${productRow} - Column: ${column} \n \t Value: ${value} \n \t Error: ${message} \n \n`;
      txtFileContent.push(content);
    }

    writeFileSync(fileToDownload, txtFileContent.join(''), {
      encoding: 'utf-8',
    });

    return res.download(fileToDownload);
  } catch (error) {
    errorsHandler(req, res, error);
  }
};

export default { createLog, logDownload };
