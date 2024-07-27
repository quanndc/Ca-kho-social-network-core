import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put, Query } from "@nestjs/common";
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Req() req, @Body() createPostDto: CreatePostDto) {
    const { uid } = req.user;
    return this.postService.create(createPostDto, uid);
  }

  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async findPostById(@Param('id') id: string) {
    return this.postService.findPostById(+id);
  }

  @Get(':uid')
  async findPostByUid(@Query('uid') uid: string) {
    return this.postService.findPostByUid(uid);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(+id, updatePostDto);
  }




}
