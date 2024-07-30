import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Put,
  Query,
  UseInterceptors,
  UploadedFiles
} from "@nestjs/common";
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilesInterceptor } from "@nestjs/platform-express";
import { StorageService } from "../storage/storage.service";
import { Storage } from "../storage/entities/storage.entity";
import { IdgenService } from "../utils/idgen/idgen.service";

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService,
              private readonly storageService: StorageService,
              private idGenService: IdgenService
  ) {}

  // @Post()
  // async create(@Req() req, @Body() createPostDto: CreatePostDto) {
  //   const { uid } = req.user;
  //   return this.postService.create(createPostDto, uid, req.files, req.storageEntity);
  // }

  //call storage controller to upload image
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(@UploadedFiles() photos: Express.Multer.File[], @Body() createPostDto: CreatePostDto, @Req() req){
    createPostDto.id = this.idGenService.generateId();
    console.log(createPostDto.id);
    const urls = await this.storageService.uploadFilesToFirebase(photos,'post/'+createPostDto.id);
    console.log("postImage :",urls);
    const { uid } = req.user;
    console.log("da chay");
    return this.postService.create(createPostDto, uid, urls);
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
