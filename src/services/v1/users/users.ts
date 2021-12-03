import { Roles } from './../../../helpers/v1/roles/roles';
import { Request, Response, NextFunction } from 'express';
import { errorsHandler } from '../../../helpers/v1/handlers/errorsHandler';
import User from '../../../models/v1/user/user';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import RolesService from '../roles/roles';
import Role from '../../../models/v1/user/roles';
import argon2 from 'argon2';

const createUser = async (req: Request, res: Response): Promise<any> => {
  // FIXME Send email of verification
  try {
    const { name, email, password } = req.body;

    let user: any = await User.create({
      name,
      email,
      password,
    });
    req.body.id = user.id;

    const userRoles = await RolesService.createRoles(req, res);
    user = {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: userRoles,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    if (req.body.signUp) return user;

    return res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    errorsHandler(req, res, error);
  }
};

const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await User.findAll({
      include: {
        model: Role,
        as: 'roles',
        attributes: ['name'],
      },
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });
    return res.status(StatusCodes.OK).json(users);
  } catch (error) {
    errorsHandler(req, res, error);
  }
};

const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    let user: any = await User.findByPk(id, {
      include: {
        model: Role,
        as: 'roles',
        attributes: ['id'],
      },
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });

    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });

    if (req.body.email) await emailExists(req, res);

    if (req.body.roles) {
      const newRoles = req.body.roles;
      req.body.roles = user.roles;
      await RolesService.deleteRoles(req, res);
      req.body.roles = newRoles;
      await RolesService.createRoles(req, res);
    }

    if (req.body.password) {
      const hash = await argon2.hash(req.body.password);
      req.body.password = hash;
    }

    const newData = req.body;
    await User.update(newData, {
      where: { id },
    });

    delete newData.password;
    user = { ...user.dataValues, ...newData };
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    errorsHandler(req, res, error);
  }
};

const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: {
        model: Role,
        as: 'roles',
        attributes: ['name'],
      },
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });
    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    errorsHandler(req, res, error);
  }
};

const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id;
    const user: any = await User.findByPk(id, {
      include: {
        model: Role,
        as: 'roles',
        attributes: ['id'],
      },
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });
    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    user.email = null;
    req.body.roles = user.roles;
    await user.save();
    await RolesService.deleteRoles(req, res);
    await User.destroy({
      where: { id },
    });

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    errorsHandler(req, res, error);
  }
};

const emailExists = async (req: any, res: Response): Promise<any> => {
  try {
    const user: any = await User.findOne({
      attributes: ['id', 'email'],
      where: {
        email: req.body.email || req.user.email,
      },
    });
    if (user) {
      if (user.email !== (req.body.email || req.user.email))
        return res.status(StatusCodes.BAD_REQUEST).json({
          statusCode: StatusCodes.BAD_REQUEST,
          message: 'The emai exists already',
        });
    }
  } catch (error) {
    errorsHandler(req, res, error);
  }
};

const findByEmail = async (email: string): Promise<any> => {
  const user = await User.findOne({
    attributes: [
      'id',
      'name',
      'email',
      'password',
      'emailVerifiedAt',
      'createdAt',
      'updatedAt',
    ],
    where: {
      email,
    },
    paranoid: false,
  });
  return user;
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return {};
};

export default {
  createUser,
  getUsers,
  updateUser,
  getUser,
  deleteUser,
  findByEmail,
  resetPassword,
};
