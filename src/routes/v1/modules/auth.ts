import { Router } from 'express';
import { signUpReq, loginReq } from '../../../requests/v1/auth/authRequests';
import { confirmToken } from '../../../requests/v1/users/users';
import AuthService from '../../../services/v1/auth/auth';
const router = Router();

router.post('/signup', signUpReq, AuthService.signUp);

router.post('/login', loginReq, AuthService.login);

router.get('/confirm-email/:token', confirmToken, AuthService.confirmAccount);

export default router;

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
