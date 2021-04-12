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

    @Column('timestamp with time zone')
    date: Date;

    @Column()
    event_id: string;

    // @ManyToOne(() => Event )
    // @JoinColumn({name: 'event_id'})
    // event: Event

    @ManyToOne(() => Event, event => event.schedules)
    @JoinColumn({name: 'event_id'})
    event: Event;

    @CreateDateColumn()
    created_at: Date;
}

export default Schedule;