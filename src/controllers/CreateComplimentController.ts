import { Request, Response } from 'express';

import { CreateComplimentService } from '../services';

class CreateComplimentController {
	async handle(request: Request, response: Response) {
		const { receiver_id, tag_id, message } = request.body;
		const { user_id } = request;

		const createComplimentService = new CreateComplimentService();

		const compliment = await createComplimentService.execute({
			sender_id: user_id,
			receiver_id,
			tag_id,
			message,
		});

		return response.json(compliment);
	}
}

export { CreateComplimentController };
