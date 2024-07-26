import {
  Controller,

  Post,

  UploadedFiles,
  UseInterceptors,
  MaxFileSizeValidator, ParseFilePipe, FileTypeValidator, Query, Body
} from "@nestjs/common";
import { StorageService } from './storage.service';
import { FilesInterceptor } from "@nestjs/platform-express";
import {Storage} from "./entities/storage.entity";

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post("upload")
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@Body() storageEntity: Storage,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<{ urls: string[] }> {
    try {
      const urls = await this.storageService.uploadFilesToFirebase(files, storageEntity);
      console.log(urls);
      return { urls };
    } catch (error) {
      throw error;
    }
  }
}
