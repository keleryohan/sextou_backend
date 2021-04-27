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

import { Exclude, Expose } from 'class-transformer';

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

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null {
      if (!this.avatar) {
        return null;
      }

      return `${process.env.APP_API_URL}/files/${this.avatar}`;
    }
}


export default User;