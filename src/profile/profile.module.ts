import { Module  } from "@nestjs/common";
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "./entities/profile.entity";
import { Auth } from "../auth/entities/auth.entity";
import { Post } from "src/post/entities/post.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Auth])],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [TypeOrmModule],
})
export class ProfileModule {}
