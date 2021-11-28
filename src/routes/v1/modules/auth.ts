import express from 'express';
const router = express.Router();

// Defining components

/**
 * @swagger
 * components:
 *  schemas:
 *    Task:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: sakldfjasldkf id
 *        name:
 *          type: string
 *          description: lkajsdlfj name
 *        description:
 *          type: string
 *          description: askldfjkdls description
 *      required:
 *        - name
 *        - description
 *      example:
 *        id: aslkdfjaslkdf
 *        name: My first task
 *        description: Il kjasdklfjaslkdf
 *  parameters:
 *    taskId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: parameter
 */

// Defining tag module
/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: Task endpoint
 */

/**
 * @swagger
 * /auth/signup:
 *  get:
 *    summary: Route to signup
 *    tags: [Tasks]
 *    responses:
 *      200:
 *        description: klasdfjlkasjdfkl
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Task'
 */
router.get('/signup', (req, res, next) => {
  res.send('signup');
});

// router.get('/login', (req, res, next) => {
//   res.send('login');
// });

// router.get('/logout', (req, res, next) => {
//   res.send('logout');
// });

export default router;
