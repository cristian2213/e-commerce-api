import express from 'express';
import ProductsService from '../../../services/v1/products/products';
const router = express.Router();

router.get('/get-products', ProductsService.getProducts); // paginated!
router.get('/get-product/:slug', ProductsService.getProduct);
router.post('/create-product', ProductsService.createProduct);
router.put('/update-product/:slug', ProductsService.updateProduct); // it wouldn't update order field
router.delete('/delete-product/:slug', ProductsService.deleteProduct);

router.post('/bulk-upload');
router.put('/update-position/:id', ProductsService.updateProductPosition); // apply data structure

// /**
//  * @openapi
//  * /api-module2/{userId}:
//  *   get:
//  *     description: Welcome to swagger-jsdoc
//  *     summary: Welcome to swagger-jsdoc
//  *     parameters:
//  *      - name: userId
//  *        in: path
//  *        required: true
//  *        description: Parameter description
//  *        schema:
//  *          type: integer
//  *          minimum: 1
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *          schema:
//  *            type: object
//  *            properties:
//  *              username:
//  *                type: string
//  *              password:
//  *                type: integer
//  *     responses:
//  *       200:
//  *         description: Returns a mysterious string.
//  *         content:
//  *          application/json:
//  *            schema:
//  *              type: object
//  *              properties:
//  *                id:
//  *                  type: integer
//  *                  format: int64
//  *                  example: 4
//  *                name:
//  *                  type: string
//  *                  example: Jessica Smith
//  *       401:
//  *         description: Returns a mysterious string.
//  *       500:
//  *         description: Returns a mysterious string.
//  */
// router.get('/get-products/:userId', (req, res, next) => {
//   res.send('get-products');
// });

export default router;
