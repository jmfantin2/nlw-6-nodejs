import { getCustomRepository } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { UserRepository } from '../repositories';

class ListUsersService {
	async execute() {
		const userRepo = getCustomRepository(UserRepository);
		const users = await userRepo.find();

		// applies the @Exclude so the password is well hidden
		return classToPlain(users);
	}
}
export { ListUsersService };
