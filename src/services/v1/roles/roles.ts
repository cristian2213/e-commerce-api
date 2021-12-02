import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { errorsHandler } from '../../../helpers/v1/handlers/errorsHandler';
import Role from '../../../models/v1/user/roles';

const createRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = await Role.create(req.body);
    return res.status(StatusCodes.CREATED).json(role);
  } catch (error) {
    errorsHandler(req, res, error);
  }
};

const getRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await Role.findAll();
    return res.status(StatusCodes.OK).json(roles);
  } catch (error) {
    errorsHandler(req, res, error);
  }
};

const getRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const role = await Role.findOne({
      where: {
        id,
      },
    });
    if (!role)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        message: `The user #${id} doesn't exist`,
      });

    return res.status(StatusCodes.OK).json(role);
  } catch (error) {
    errorsHandler(req, res, error);
  }
};

const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        message: `The user #${id} doesn't exist`,
      });

    const roleUpdated = await role.update(req.body);
    return res.status(StatusCodes.OK).json(roleUpdated);
  } catch (error) {
    errorsHandler(req, res, error);
  }
};

const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        message: `The user #${id} doesn't exist`,
      });

    const roleDeleted = await role.destroy();
    return res.status(StatusCodes.OK).json(roleDeleted);
  } catch (error) {
    errorsHandler(req, res, error);
  }
};
export default { createRole, getRoles, getRole, updateRole, deleteRole };
