import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
  } from 'typeorm';

import Event from './Event';
import User from './User';

@Entity("participants")
class Participant{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    event_id: string;

    @Column()
    user_id: string;

    @ManyToOne(() => Event )
    @JoinColumn({name: 'event_id'})
    event: Event

    @ManyToOne(() => User )
    @JoinColumn({name: 'user_id'})
    user: User

    @CreateDateColumn()
    created_at: Date;
}



export default Participant;