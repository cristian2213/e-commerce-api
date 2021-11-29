import { Request, Response, NextFunction } from 'express';
import User, { UserInstance } from '../../../models/v1/user/user';

const createUser = async (userData: UserInstance): Promise<UserInstance> => {
  const user = await User.create(userData);
  // Send email of verification
  return user;
};

const getUsers = async () => {
  return [];
};

const updateUser = async () => {
  return {};
};

const getUser = async (userId: number) => {
  return {};
};

const deleteUser = async (userId: number) => {
  return {};
};

const findByEmail = async (email: string): Promise<UserInstance | null> => {
  const user = await User.findOne({
    where: {
      email,
    },
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

export default { findByEmail, createUser };
