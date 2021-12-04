import { Router } from 'express';
import verifyToken from '../../../middlewares/v1/auth/verifyToken';
import {
  createUserReq,
  getUserReq,
  updateUserReq,
  deleteUserReq,
  resetPasswordReq,
  confirmToken,
  updatePassword,
} from '../../../requests/v1/users/users';
import UsersService from '../../../services/v1/users/users';

const router = Router();

router.get('/get-users', UsersService.getUsers);
router.get('/get-user/:id', getUserReq, UsersService.getUser);
router.post('/create', createUserReq, UsersService.createUser);
router.put(
  '/update-user/:id',
  verifyToken,
  updateUserReq,
  UsersService.updateUser
);
router.delete(
  '/delete-user/:id',
  verifyToken,
  deleteUserReq,
  UsersService.deleteUser
);

router.post('/reset-password', resetPasswordReq, UsersService.resetPassword);

router.get('/reset-password/:token', confirmToken, UsersService.confirmToken);

router.post(
  '/reset-password/:token',
  updatePassword,
  UsersService.updatePassword
);

export default router;
