import multer from 'multer';
import { join } from 'path';
import { Router } from 'express';
import {
  createProductReq,
  updateProductReq,
  getProductReq,
  getProductsReq,
  bulkUploadReq,
} from '../../../requests/v1/products/products';
import ProductsService from '../../../services/v1/products/products';
import ProductsBulkUploadService from '../../../services/v1/products/productsBulkUpload';
import FileInterceptor from '../../../services/v1/filesUploadInterceptors/uploadCsvXlsxFile';

const router = Router();

router.get('/get-products', getProductsReq, ProductsService.getProducts);
router.get('/get-product/:slug', getProductReq, ProductsService.getProduct);
router.post('/create-product', createProductReq, ProductsService.createProduct);
router.put(
  '/update-product/:slug',
  getProductReq,
  updateProductReq,
  ProductsService.updateProduct
);
router.delete(
  '/delete-product/:slug',
  getProductReq,
  ProductsService.deleteProduct
);

router.post(
  '/bulk-upload-validation',
  multer(
    FileInterceptor.multerOptions(
      join(__dirname, '..', '..', '..', 'storage', 'v1', 'docs', 'products')
    )
  ).single('productsFile'),
  ProductsBulkUploadService.productsBulkUploadValidation
);

router.post(
  '/bulk-upload',
  bulkUploadReq,
  ProductsBulkUploadService.productsBulkUpload
);
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
