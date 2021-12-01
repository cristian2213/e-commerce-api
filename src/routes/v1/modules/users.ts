import { Router } from 'express';
import verifyToken from '../../../middlewares/v1/auth/verifyToken';
import {
  createUserReq,
  getUserReq,
  updateUserReq,
  deleteUserReq,
} from '../../../requests/v1/users/users';
import UsersService from '../../../services/v1/users/users';
const router = Router();

router.get('/create', createUserReq, UsersService.createUser);
router.get('/get-users', UsersService.getUsers);
router.get('/get-user/:id', getUserReq, UsersService.getUser);
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

export default router;
