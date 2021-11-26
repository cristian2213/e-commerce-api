import express from 'express';
const router = express.Router();

router.get('/get-products', (req, res, next) => {
  res.send('get-products');
});

export default router;
