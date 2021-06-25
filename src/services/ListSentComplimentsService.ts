import { getCustomRepository } from 'typeorm';
import { ComplimentRepository } from '../repositories/ComplimentRepository';

class ListSentComplimentsService {
	async execute(user_id: string) {
		const complimentRepo = getCustomRepository(ComplimentRepository);
		const compliments = await complimentRepo.find({
			where: { sender_id: user_id },
			// se necessário recuperar mais informações,
			// relations: [sender_id, receiver_id, tag_id]
		});
		return compliments;
	}
}

export { ListSentComplimentsService };
