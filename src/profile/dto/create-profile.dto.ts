import { IsString, IsEmail } from 'class-validator';
export class CreateProfileDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  avatarUrl: string;

  @IsString()
  bio: string;

  @IsString()
  uid: string;






}
