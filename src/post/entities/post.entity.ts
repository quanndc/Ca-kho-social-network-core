import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, Unique,
  UpdateDateColumn
} from "typeorm";
import { Profile } from "../../profile/entities/profile.entity";
import { Like } from "../../like/entities/like.entity";
import { Comment } from "../../comment/entities/comment.entity";

@Entity()
@Unique([ 'uid','id'])
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column('text', {array: true, nullable: true })
  imageUrls: string[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ type: 'text'})
  uid: string;

  @Column('int', { array: true, nullable: true })
  commentsId: number[];

  @Column('int', { array: true, nullable: true })
  likesId: number[];


  @ManyToOne(() => Profile, (profile) => profile.posts)
  @JoinColumn({ name: 'uid', referencedColumnName: 'uid' })


  @OneToMany(() => Comment, comment => comment.post)
  comments: number[];

  @OneToMany(() => Like, like => like.post)
  likes: number[];

}
