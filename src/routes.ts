import { Router } from 'express';

import {
	AuthUserController,
	CreateComplimentController,
	CreateTagController,
	CreateUserController,
	ListReceivedComplimentsController,
	ListSentComplimentsController,
	ListTagsController,
	ListUsersController,
} from './controllers';
import { ensureAdmin, ensureAuth } from './middlewares';

// always remember: verifications come in middleware

const router = Router();

const authUserController = new AuthUserController();
const createComplimentController = new CreateComplimentController();
const createTagController = new CreateTagController();
const createUserController = new CreateUserController();
const listReceivedCompController = new ListReceivedComplimentsController();
const listSentCompController = new ListSentComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post('/users', createUserController.handle);
// has the same effect of router.use(ensureAdmin, but exclusive to that route)
// if false, NextFunction won't happen and an error will occur (cool, right?!)
router.post('/tags', ensureAuth, ensureAdmin, createTagController.handle);
router.post('/login', authUserController.handle);
router.post('/compliments', ensureAuth, createComplimentController.handle);

router.get(
	'/users/compliments/sent',
	ensureAuth,
	listSentCompController.handle
);
router.get(
	'/users/compliments/received',
	ensureAuth,
	listReceivedCompController.handle
);
router.get('/tags', ensureAuth, listTagsController.handle);
router.get('/users', ensureAuth, listUsersController.handle);

export { router };
