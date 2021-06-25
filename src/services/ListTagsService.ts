import { getCustomRepository } from 'typeorm';
import { TagRepository } from '../repositories/TagRepository';
import { classToPlain } from 'class-transformer';

class ListTagsService {
	async execute() {
		const tagRepo = getCustomRepository(TagRepository);
		const tags = await tagRepo.find();
		//handles @Expose type in the entity
		return classToPlain(tags);
	}
}

export { ListTagsService };
