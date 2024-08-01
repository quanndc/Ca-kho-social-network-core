import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Profile } from "../../profile/entities/profile.entity";
import { Post } from "src/post/entities/post.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column()
  content: string;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;

  @Column({type: 'text'})
  uid: string;

  @Column()
  postId: number;

  @ManyToOne(() => Profile, (profile) => profile.uid)
  @JoinColumn({ name: 'uid', referencedColumnName: 'uid' })


  @ManyToOne(() => Post, post => post, {nullable: false})
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: Post;

}
