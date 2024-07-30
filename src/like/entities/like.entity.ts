import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../post/entities/post.entity";
import { Profile } from "../../profile/entities/profile.entity";

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  likeId: number;

  @Column()
  postId: number;

  @Column({type: 'text'})
  uid: string;

  @ManyToOne(()=> Profile, (profile) => profile.uid)
  @JoinColumn({ name: 'uid', referencedColumnName : 'uid'})

  @ManyToOne(() => Post, post => post, {nullable: false})
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: Post;


}
