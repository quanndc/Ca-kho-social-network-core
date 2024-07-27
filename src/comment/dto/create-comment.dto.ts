import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  uid: string;

  @IsNotEmpty()
  @IsNumber()
  postId: number;
}