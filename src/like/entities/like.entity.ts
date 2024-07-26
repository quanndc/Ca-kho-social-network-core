import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../post/entities/post.entity";
import { Profile } from "../../profile/entities/profile.entity";

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.likes)
  post: Post;

  @ManyToOne(()=> Profile, (profile) => profile.likes)

  profile: Profile;


}
