import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

interface IUserRequest {
	name: string;
	email: string;
	admin?: boolean;
}

class CreateUserService {
	async execute({ name, email, admin }: IUserRequest) {
		const usersRepo = getCustomRepository(UserRepository);

		//precisa ter email
		if (!email) {
			throw new Error('That is not an email');
		}

		//o email não pode estar em uso
		const userAlreadyExists = await usersRepo.findOne({
			email,
		});
		if (userAlreadyExists) {
			throw new Error('User already exists');
		}

		//se chegou até aqui, toca ficha
		const user = usersRepo.create({
			name,
			email,
			admin,
		});

		await usersRepo.save(user);
		return user;
	}
}

export { CreateUserService };
