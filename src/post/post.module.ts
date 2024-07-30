import { Module } from "@nestjs/common";
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "../profile/entities/profile.entity";
import { Post } from "./entities/post.entity";
import { ProfileModule } from "../profile/profile.module";

@Module({
  imports: [TypeOrmModule.forFeature([Post]),
    ProfileModule

  ] ,
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
