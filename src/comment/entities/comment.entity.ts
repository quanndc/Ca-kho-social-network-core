import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../../profile/entities/profile.entity";
import { Post } from "src/post/entities/post.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column()
  content: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({type: 'text'})
  uid: string;

  @Column()
  postId: number;

  @ManyToOne(() => Profile, (profile) => profile.uid)
  @JoinColumn({ name: 'uid', referencedColumnName: 'uid' })


  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: Post;
}
