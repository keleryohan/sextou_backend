import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
  } from 'typeorm';

import Event from './Event';

@Entity("locations")
class Location{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column()
    location: string;

    @ManyToOne(() => Event)
    @JoinColumn({name: 'event_id'})
    event: Event;

    @CreateDateColumn()
    created_at: Date;
}


export default Location;