import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async create(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.create(createLikeDto, createLikeDto.uid, createLikeDto.postId);
  }

  @Delete(':likeId')
  async remove(@Param('likeId') likeId: string) {
    return this.likeService.deleteLike(+likeId);
  }

}
