import { Router } from 'express';
import authRoutes from './modules/auth';
import prodRoutes from './modules/products';
const router = Router();

router.use('/auth', authRoutes);
router.use('/products', prodRoutes);

export default router;
