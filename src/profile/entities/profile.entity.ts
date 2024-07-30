import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Post } from "../../post/entities/post.entity";
import { Like } from "src/like/entities/like.entity";
import { Comment } from "src/comment/entities/comment.entity";
@Entity()
export class Profile {

  @PrimaryColumn()
  uid: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatarUrl: string;

  @Column()
  bio: string;

  @OneToMany(() => Post, (post) => post.uid)
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.commentId)
  comments: Comment[];

  @OneToMany(() => Like, like => like.likeId)
  likes: Like[];

}
