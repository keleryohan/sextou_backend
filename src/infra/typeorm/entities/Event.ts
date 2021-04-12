import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    OneToOne,
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
    
    @Column()
    created_by: string;

    @Column()
    is_public: boolean;

    @ManyToOne(() => User)
    @JoinColumn({name: 'created_by'})
    created_by_user: User;
        
    @Column()
    chosen_location_id: string;

    @OneToOne(() => Location)
    @JoinColumn({name: 'chosen_location_id'})
    chosen_location: Location;

    @OneToOne(() => Schedule)
    @JoinColumn({name: 'chosen_schedule_id'})
    chosen_schedule: Schedule;

    @Column()
    chosen_schedule_id: string;

    // @ManyToMany(() => User)
    // @JoinTable()
    // users: User[];
    
    @OneToMany(() => Location, location => location.event)
    locations: Location[];
    
    @OneToMany(() => Schedule, schedule => schedule.event)
    schedules: Schedule[];
}  

export default Event;