import { getCustomRepository } from 'typeorm';
import { TagRepository } from '../repositories/TagRepository';

class CreateTagService {
	async execute(name: string) {
		const tagRepo = getCustomRepository(TagRepository);

		if (!name) throw new Error('Missing name');

		const tagAlreadyExists = await tagRepo.findOne({ name });

		if (tagAlreadyExists) throw new Error('Tag already exists');

		//se chegou até aqui, toca ficha
		const tag = tagRepo.create({ name });
		await tagRepo.save(tag);
		return tag;
	}
}

export { CreateTagService };
