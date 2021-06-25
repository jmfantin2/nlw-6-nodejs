import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { AuthUserController } from './controllers/AuthUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ensureAuth } from './middlewares/ensureAuth';

// always remember: verifications come in middleware

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authUserController = new AuthUserController();
const createComplimentController = new CreateComplimentController();

router.post('/users', createUserController.handle);
// has the same effect of router.use(ensureAdmin, but exclusive to that route)
// if false, NextFunction won't happen and an error will occur (cool, right?!)
router.post('/tags', ensureAuth, ensureAdmin, createTagController.handle);
router.post('/login', authUserController.handle);
router.post('/compliments', ensureAuth, createComplimentController.handle);

export { router };
