import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
  } from 'typeorm';

import Event from './Event';

@Entity("schedules")
class Schedule{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    date: Date;

    @ManyToOne(() => Event )
    @JoinColumn({name: 'eventID'})
    event: Event
}

export default Schedule;