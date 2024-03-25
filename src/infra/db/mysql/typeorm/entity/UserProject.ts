import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { IProject, IUser, IUserProject, UserRole } from "@/domain/entities";
import { Project, User } from "@/infra/db/mysql/typeorm/entity";

@Entity()
export class UserProject implements IUserProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  invitedBy: number;

  @Column()
  removedBy: number;

  @Column({
    type: 'enum',
    enum: UserRole
  })
  role: UserRole;

  @ManyToOne(() => User, (user) => user.projects)
  user: IUser;

  @ManyToOne(() => Project, (project) => project.users)
  project: IProject;

  @CreateDateColumn({
    name: "accepted_at",
    type: "timestamp",
  })
  acceptedAt: Date;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt?: Date;
}
