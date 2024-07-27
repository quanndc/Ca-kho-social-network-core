import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../post/entities/post.entity";
import { Repository } from "typeorm";
import { Profile } from "../profile/entities/profile.entity";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  // create comment
  async create(createCommentDto: CreateCommentDto, uid: string, postId: number) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    const profile = await this.profileRepository.findOne({ where: { uid } });

    // If the post is empty, throw an error
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // If the uid is empty, throw an error
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    // Create the comment in the postEntity and create comment entity
    const newComment = this.commentRepository.create({ ...createCommentDto, uid, postId });
    const savedComment = await this.commentRepository.save(newComment);

    return savedComment;
  }
}
