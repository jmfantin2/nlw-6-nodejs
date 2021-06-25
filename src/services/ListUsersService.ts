import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import { classToPlain } from 'class-transformer';

class ListUsersService {
	async execute() {
		const userRepo = getCustomRepository(UserRepository);
		const users = await userRepo.find();

		// applies the @Exclude so the password is well hidden
		return classToPlain(users);
	}
}
export { ListUsersService };
