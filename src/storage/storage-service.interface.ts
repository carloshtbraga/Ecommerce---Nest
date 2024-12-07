export interface IStorageService {
  upload(
    key: string,
    contentType: string,
    buffer: Buffer,
    bucketName: string,
  ): Promise<boolean>;
  download(args: {
    key: string;
    bucketName: string;
  }): Promise<{ contentType: string; buffer: Buffer }>;
}
