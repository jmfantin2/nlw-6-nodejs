import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { AuthUserController } from './controllers/AuthUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ListSentComplimentsController } from './controllers/ListSentComplimentsController';
import { ListReceivedComplimentsController } from './controllers/ListReceivedComplimentsController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuth } from './middlewares/ensureAuth';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUsersController } from './controllers/ListUsersController';

// always remember: verifications come in middleware

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authUserController = new AuthUserController();
const createComplimentController = new CreateComplimentController();
const listSentComplimentsController = new ListSentComplimentsController();
const listReceivedComplimentsController =
	new ListReceivedComplimentsController();
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
	listSentComplimentsController.handle
);
router.get(
	'/users/compliments/received',
	ensureAuth,
	listReceivedComplimentsController.handle
);
router.get('/tags', ensureAuth, listTagsController.handle);
router.get('/users', ensureAuth, listUsersController.handle);

export { router };
