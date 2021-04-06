import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable
  } from 'typeorm';

import Location from './Location';
import Schedule from './Schedule';
import User from './User';

@Entity("events")
class Event{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    voting_limit_date: Date;

    @ManyToOne(() => User)
    @JoinColumn({name: 'created_by'})
    createdBy: Location;

    @ManyToOne(() => Location)
    @JoinColumn({name: 'chosenLocationID'})
    chosenLocation: Location;

    @ManyToOne(() => Schedule)
    @JoinColumn({name: 'chosenScheduleID'})
    chosenSchedule: Schedule;

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];

}

export default Event;