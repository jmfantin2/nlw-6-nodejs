import { EntityRepository, Repository } from 'typeorm';

import { Compliment } from '../entities';

@EntityRepository(Compliment)
class ComplimentRepository extends Repository<Compliment> {}

export { ComplimentRepository };
