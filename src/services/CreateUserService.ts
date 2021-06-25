import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import { hash } from 'bcryptjs';

interface IUserRequest {
	name: string;
	email: string;
	password: string;
	admin?: boolean;
}

class CreateUserService {
	async execute({ name, email, password, admin = false }: IUserRequest) {
		const userRepo = getCustomRepository(UserRepository);

		//precisa ter email
		if (!email) throw new Error('Email is missing');

		//o email não pode estar em uso
		const userAlreadyExists = await userRepo.findOne({ email });
		if (userAlreadyExists) throw new Error('User already exists.');

		//tratar a senha com o devido respeito
		const pwHash = await hash(password, 8);

		//se chegou até aqui, toca ficha
		const user = userRepo.create({
			name,
			email,
			password: pwHash,
			admin,
		});

		await userRepo.save(user);
		return user;
	}
}

export { CreateUserService };
