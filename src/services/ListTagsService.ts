import { getCustomRepository } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { TagRepository } from '../repositories';

class ListTagsService {
	async execute() {
		const tagRepo = getCustomRepository(TagRepository);
		const tags = await tagRepo.find();
		//handles @Expose type in the entity
		return classToPlain(tags);
	}
}

export { ListTagsService };
