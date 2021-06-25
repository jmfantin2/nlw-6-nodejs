import { Request, Response } from 'express';
import { CreateComplimentService } from '../services/CreateComplimentService';

class CreateComplimentController {
	async handle(request: Request, response: Response) {
		const { sender_id, receiver_id, tag_id, message } = request.body;
		const createComplimentService = new CreateComplimentService();

		const compliment = await createComplimentService.execute({
			sender_id,
			receiver_id,
			tag_id,
			message,
		});

		return response.json(compliment);
	}
}

export { CreateComplimentController };
