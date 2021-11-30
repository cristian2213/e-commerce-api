import { Router } from 'express';
import authRoutes from './modules/auth';
import userRoutes from './modules/users';
import prodRoutes from './modules/products';
const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
// router.use('/products', prodRoutes);

export default router;
