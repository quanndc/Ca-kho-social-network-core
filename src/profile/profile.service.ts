import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from "./entities/profile.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Auth } from 'src/auth/entities/auth.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async createProfile(createProfileDto: CreateProfileDto, uid: string): Promise<Profile> {
    // Kiểm tra xem profile đã tồn tại chưa
    const existingProfile = await this.profileRepository.findOne({ where: { uid } });
    if (existingProfile) {
      throw new ConflictException('Profile already exists');
    }
    // Kiểm tra các trường không được phép null
    if (!createProfileDto.name && !createProfileDto.avatarUrl) {
      throw new ConflictException('Name, avatarUrl, and bio cannot be empty');
    }
    // Tạo profile mới
    const profile = this.profileRepository.create(createProfileDto);
    profile.uid = uid;
    // Lưu profile
    return this.profileRepository.save(profile);


  }

  async getProfile(uid: string): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: { uid } });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile
  }

  async updateProfile(uid: string, updateProfileDto: Partial<CreateProfileDto>): Promise<Profile> {
    console.log('updateProfileDto:', updateProfileDto);
    const user = await this.profileRepository.findOne({ where: { uid } });
    if (!user) {
      throw new NotFoundException('User or profile not found');
    }
    console.log('user:', user);
    // Kiểm tra không cho phép chỉnh sửa email và uid
    if (updateProfileDto.email && user.email !== updateProfileDto.email) {
      throw new BadRequestException('Email cannot be changed');
    }
    // Kiểm tra các trường không được phép null
    if (!updateProfileDto.name || !updateProfileDto.avatarUrl) {
      console.log('updateProfileDto:', updateProfileDto);
      throw new ConflictException('Name, avatarUrl, and bio cannot be empty');
    }

    //uid không được phép thay đổi
    if (updateProfileDto.uid && user.uid !== updateProfileDto.uid) {
      throw new BadRequestException('uid cannot be changed');
    }
    // Cập nhật profile
    await this.profileRepository.update({ uid }, updateProfileDto);
    return this.profileRepository.findOne({ where: { uid } });



  }

}
