import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

interface IUserRequest {
	name: string;
	email: string;
	admin?: boolean;
}

class CreateUserService {
	async execute({ name, email, admin }: IUserRequest) {
		const userRepo = getCustomRepository(UserRepository);

		//precisa ter email
		if (!email) throw new Error('Email is missing');

		//o email não pode estar em uso
		const userAlreadyExists = await userRepo.findOne({ email });
		if (userAlreadyExists) throw new Error('User already exists');

		//se chegou até aqui, toca ficha
		const user = userRepo.create({
			name,
			email,
			admin,
		});

		await userRepo.save(user);
		return user;
	}
}

export { CreateUserService };
