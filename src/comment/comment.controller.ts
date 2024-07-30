import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from "@nestjs/common";
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto, createCommentDto.uid, createCommentDto.postId);
  }



 //@get comment by postId
  @Get()
  async findCommentByPostId(@Query('postId') postId: string) {
    return this.commentService.findCommentByPostId(+postId);
  }


  //get comment by commentId
  @Get(':commentId')
  async findCommentByCommentId(@Param('commentId') commentId: string) {
    return this.commentService.findCommentById(+commentId);
  }
//update comment
  @Put(':commentId')
  async update(@Param('commentId') commentId: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.updateComment(+commentId, updateCommentDto);
  }

  @Delete(':commentId')
  async remove(@Param('commentId') commentId: string) {
    return this.commentService.deleteComment(+commentId);
  }
}
