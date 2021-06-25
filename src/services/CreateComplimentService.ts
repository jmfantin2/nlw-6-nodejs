import { getCustomRepository } from 'typeorm';
import { ComplimentRepository } from '../repositories/ComplimentRepository';
import { UserRepository } from '../repositories/UserRepository';

interface IComplimentRequest {
	sender_id: string;
	receiver_id: string;
	tag_id: string;
	message: string;
}

class CreateComplimentService {
	async execute({
		sender_id,
		receiver_id,
		tag_id,
		message,
	}: IComplimentRequest) {
		const complimentRepo = getCustomRepository(ComplimentRepository);
		const userRepo = getCustomRepository(UserRepository);

		if (sender_id === receiver_id) {
			throw new Error("Can't compliment yourself.");
		}
		const receiverExists = await userRepo.findOne(receiver_id);
		if (!receiverExists) throw new Error('Receiver not found.');

		const compliment = complimentRepo.create({
			sender_id,
			receiver_id,
			tag_id,
			message,
		});

		await complimentRepo.save(compliment);

		return compliment;
	}
}

export { CreateComplimentService };
