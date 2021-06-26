import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Tag, User } from '../entities';

@Entity('compliments')
class Compliment {
	@PrimaryColumn()
	readonly id: string;

	@Column()
	sender_id: string;

	@Column()
	receiver_id: string;

	@JoinColumn({ name: 'sender_id' })
	@ManyToOne(() => User)
	userS: User;

	@JoinColumn({ name: 'receiver_id' })
	@ManyToOne(() => User)
	userR: User;

	@Column()
	tag_id: string;

	@JoinColumn({ name: 'tag_id' })
	@ManyToOne(() => Tag)
	tag: Tag;
	//muitos elogios que correspondem à mesma tag

	@Column()
	message: string;

	@CreateDateColumn()
	created_at: Date;

	constructor() {
		if (!this.id) this.id = uuid();
	}
}

export { Compliment };
