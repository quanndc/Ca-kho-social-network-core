import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "../profile/entities/profile.entity";
import { StorageService } from "../storage/storage.service";
import { Storage } from "../storage/entities/storage.entity";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private storageService: StorageService
  ) {
  }

  async create(createPostDto: CreatePostDto, uid: string,url: string[]) {
    const profile = await this.profileRepository.findOne({ where: { uid } });


   //call the storage service to upload the image
    if (!createPostDto.uid) {
      throw new NotFoundException('uid cannot be empty');
    }
    // Create the post


  //how can I add file to call function uploadFilesToFirebase
  //   const urls = await this.storageService.uploadFilesToFirebase(files, storageEntity);
  //   console.log(urls);
    createPostDto.imageUrls = [...url];
    console.log("url",createPostDto.imageUrls);
    const newPost = this.postRepository.create({ ...createPostDto, uid });

    // Save the post
    const savedPost = await this.postRepository.save(newPost);

    return savedPost;
  }

  async findAll() {
    return await this.postRepository.find();
  }


  //get post by uid in profile
  async findPostByUid(uid: string) {
    const profile = await this.profileRepository.findOne({ where: { uid } });
    console.log(profile.uid);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return await this.postRepository.find({ where: { uid } });
  }

  //get post by id
  async findPostById(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  //update post
  async updatePost(postId: number, updatePostDto: UpdatePostDto) {
    const post = await this.findPostById(postId);
    console.log(post.uid);
    console.log(updatePostDto.uid);
    //check if the post is owned by the user
    if (post.uid !== updatePostDto.uid) {
      throw new NotFoundException('You are not the owner of this post');
    }

    const updatedPost = await this.postRepository.save({
      ...post,
      ...updatePostDto,
    });
    return updatedPost;
  }

  //delete post
  async deletePost(id: number, uid: string) {
    const post = await this.findPostById(id);
    //check if the post is owned by the user
    if (post.uid !== uid) {
      throw new NotFoundException('You are not the owner of this post');
    }

    await this.postRepository.delete({ id });

  }

}

