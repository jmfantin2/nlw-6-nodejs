import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../repositories';

export async function ensureAdmin(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const { user_id } = request;
	console.log(user_id);

	const userRepo = getCustomRepository(UserRepository);
	const { admin } = await userRepo.findOne(user_id);

	//verificar se é admin
	if (admin) return next();

	return response.status(401).json({
		error: 'You shall not pass!',
	}); //! helplit could use creative pop culture error messages
}
