import { Router } from 'express';
import * as userController from './user.controller';

const router = Router();

router.post('/', userController.createUser);
router.get('/', userController.getUsers);

export default router;
