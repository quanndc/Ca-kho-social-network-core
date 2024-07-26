import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Like } from './entities/like.entity';
import { Profile } from "../profile/entities/profile.entity";
import { Post } from 'src/post/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Profile, Post])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
