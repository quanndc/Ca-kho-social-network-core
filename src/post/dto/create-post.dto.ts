import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostDto {


  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  uid: string;

  @IsArray()
  @IsOptional()
  imageUrls?: string[];
}