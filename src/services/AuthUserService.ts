import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UserRepository } from '../repositories';

interface IAuthRequest {
	email: 'string';
	password: 'string';
}

class AuthUserService {
	async execute({ email, password }: IAuthRequest) {
		const userRepo = getCustomRepository(UserRepository);

		//email exists (?)
		const user = await userRepo.findOne({ email });
		if (!user) throw new Error('Email/Password incorrect');

		//password is correct (?)
		const pwMatch = await compare(password, user.password);
		if (!pwMatch) throw new Error('Email/Password incorrect');

		//generate token
		const token = sign(
			{ email: user.email },
			'0fed1939e0f1ca00204e21f1a7479d53',
			{
				subject: user.id,
				expiresIn: '1d',
			}
		);

		return token;
	}
}

export { AuthUserService };
