import { getCustomRepository } from 'typeorm';
import { ComplimentRepository } from '../repositories/ComplimentRepository';

class ListReceivedComplimentsService {
	async execute(user_id: string) {
		const complimentRepo = getCustomRepository(ComplimentRepository);
		const compliments = await complimentRepo.find(
			{
				where: { receiver_id: user_id },
			}
			// se necessário recuperar mais informações,
			// relations: [sender_id, receiver_id, tag_id]
		);
		return compliments;
	}
}

export { ListReceivedComplimentsService };
