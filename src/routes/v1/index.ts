import { Router } from 'express';
import authRoutes from './modules/auth';
import rolesRoutes from './modules/roles';
import userRoutes from './modules/users';
import prodRoutes from './modules/products';
import logsRoutes from './modules/logs';
const router = Router();

router.use('/auth', authRoutes);
router.use('/roles', rolesRoutes);
router.use('/users', userRoutes);
router.use('/products', prodRoutes);
router.use('/logs', logsRoutes);

export default router;
