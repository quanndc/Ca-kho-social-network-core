import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { Post } from 'src/post/entities/post.entity';
import { Profile } from "../profile/entities/profile.entity";
import { PostModule } from "../post/post.module";
import { ProfileModule } from "../profile/profile.module";

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, Profile]),
  PostModule,
    ProfileModule
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
