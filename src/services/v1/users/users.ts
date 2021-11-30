import { Request, Response, NextFunction } from 'express';
import { errorsHandler } from '../../../helpers/v1/handlers/errorsHandler';
import User, { UserInstance } from '../../../models/v1/user/user';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    // FIXME Send email of verification
    let user: any = await User.create(req.body);
    user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
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
      attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
    });
    return res.status(StatusCodes.OK).json(users);
  } catch (error) {
    errorsHandler(req, res, error);
  }
};

const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id;
    const user = await User.findOne({
      attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
      where: { id },
    });
    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });

    const newData = req.body;
    const userUpdated = await User.update(newData, {
      where: { id },
      returning: true,
    });
    return res.status(StatusCodes.OK).json(userUpdated);
  } catch (error) {
    errorsHandler(req, res, error);
  }
};

const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
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
    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
    });
    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    user.email = null;
    await user.save();
    await User.destroy({
      where: { id },
    });
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    errorsHandler(req, res, error);
  }
};

const findByEmail = async (email: string): Promise<UserInstance | null> => {
  const user = await User.findOne({
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
