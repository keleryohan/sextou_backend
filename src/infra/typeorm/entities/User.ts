import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable
  } from 'typeorm';

import Event from './Event';

import { Exclude } from 'class-transformer';

@Entity("users")
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    //@ManyToMany(() => Event)
    //@JoinTable()
    //events: Event[];
}


export default User;