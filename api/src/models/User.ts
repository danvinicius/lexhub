import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IUserProject, UserProject } from './UserProject';

export enum UserRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  COLLABORATOR = 'COLLABORATOR',
  OBSERVER = 'OBSERVER',
}

export interface IUser {
  readonly id?: number;
  name: string;
  email: string;
  password: string;
  validated: boolean;
  projects?: IUserProject[];
}

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @Column()
  validated: boolean;

  @OneToMany(() => UserProject, (project) => project.user)
  projects: IUserProject[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
