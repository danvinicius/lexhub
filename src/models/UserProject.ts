import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { IProject, Project } from './Project';
import { UserRole, IUser, User } from './User';

export interface IUserProject {
  readonly id?: number;
  removedBy: number;
  role: UserRole;
  user: IUser;
  project: IProject;
}

@Entity()
export class UserProject implements IUserProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'removed_by',
    nullable: true,
  })
  removedBy: number;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({
    name: 'user_id',
  })
  user: IUser;

  @ManyToOne(() => Project, (project) => project.users)
  @JoinColumn({
    name: 'project_id',
  })
  project: IProject;

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
