import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    ManyToOne,
    JoinColumn
  } from 'typeorm';

import User from './User';
import Event from './Event';
import Schedule from './Schedule';
import Location from './Location';

@Entity("votings")
class Voting{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column()
    event_id: string;

    @ManyToOne(() => Event)
    @JoinColumn({name: 'event_id'})
    event: Event;

    @Column()
    schedule_id: string;

    @Column()
    location_id: string;

    @ManyToOne(() => Schedule)
    @JoinColumn({name: 'schedule_id'})
    chosenSchedule: Schedule;

    @ManyToOne(() => Location)
    @JoinColumn({name: 'location_id'})
    chosenLocation: Location;

    @CreateDateColumn()
    created_at: Date;
}


export default Voting;