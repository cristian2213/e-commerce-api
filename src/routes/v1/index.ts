// ******************** External dependencies **********************
import express from 'express';
const router = express.Router();
// *****************************************************************
// ******************** Local dependencies *************************
import authRoutes from './modules/auth.route';
import productsRoutes from './modules/products.route';
// *****************************************************************

// ********************  Authentication routes *********************
router.use('/auth', authRoutes);

router.use('/products', productsRoutes);
// *****************************************************************

export default router;
