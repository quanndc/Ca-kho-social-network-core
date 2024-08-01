import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FirebaseModule } from "nestjs-firebase";
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from "./auth/firebase-auth.middleware";
import { ProfileModule } from './profile/profile.module';
import { StorageModule } from './storage/storage.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { IdgenService } from './utils/idgen/idgen.service';
import { IdgenModule } from './utils/idgen/idgen.module';


@Module({
  imports: [
    FirebaseModule.forRoot({
      googleApplicationCredential: "./configs/private-key.json" // Đường dẫn đến file firebase-admin-key.json
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 32771,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      username: 'admin',
      password: 'admin123',
      database: 'mxh',
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    ProfileModule,
    StorageModule,
    PostModule,
    CommentModule,
    LikeModule,
    IdgenModule,

  ],

  controllers: [AppController],
  providers: [AppService, IdgenService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*'); // Áp dụng middleware cho tất cả các route, bạn có thể tùy chỉnh theo nhu cầu
  }
}
