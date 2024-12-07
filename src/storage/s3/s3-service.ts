import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { EnvService } from '@src/env/env.service';
import { IStorageService } from '@src/storage/storage-service.interface';

@Injectable()
export class S3Service implements IStorageService {
  private logger = new Logger(S3Service.name);
  private s3: S3;

  constructor(private readonly envService: EnvService) {
    this.s3 = new S3({
      accessKeyId: this.envService.AWS_ACCESS_KEY_ID,
      secretAccessKey: this.envService.AWS_SECRET_ACCESS_KEY,
      region: this.envService.AWS_REGION,
    });
  }

  async upload(
    key: string,
    contentType: string,
    buffer: Buffer,
    bucketName: string,
  ): Promise<boolean> {
    const options = {
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
      Body: buffer,
    };
    await this.s3.putObject(options).promise();
    return true;
  }

  public async download(args: {
    key: string;
    bucketName: string;
  }): Promise<{ contentType: string; buffer: Buffer }> {
    const { key, bucketName } = args;

    try {
      const params = { Bucket: bucketName, Key: key };
      const data = await this.s3.getObject(params).promise();
      return {
        contentType: data.ContentType as string,
        buffer: data.Body as Buffer,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
