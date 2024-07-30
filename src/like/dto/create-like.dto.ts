import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLikeDto {
  @IsNotEmpty()
  @IsString()
  uid: string;

  @IsNotEmpty()
  @IsNumber()
  postId: number;

}
