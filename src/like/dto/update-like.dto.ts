import { PartialType } from '@nestjs/mapped-types';
import { CreateLikeDto } from './create-like.dto';
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateLikeDto extends PartialType(CreateLikeDto) {
  @IsNotEmpty()
  @IsNumber()
  likeId: number;

  @IsNotEmpty()
  @IsNumber()
  commentId: number;
}
