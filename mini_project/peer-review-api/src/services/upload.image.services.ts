import imagekit from "../configs/imagekit.js";

interface ImageUploadResponse {
  url: string;
  fileId: string;
}

export default class UploadService {
  static async processImage(
    file: Express.Multer.File
  ): Promise<ImageUploadResponse> {
    return new Promise((resolve, reject) => {
      imagekit.upload(
        {
          file: file.buffer,
          fileName: file.originalname,
          folder: "uploads",
        },
        (error, result) => {
          if (error) return reject(error);
          if (result?.url) {
            const url = result.url;
            const fileId = result.fileId;
            return resolve({ url, fileId });
          }

          reject(new Error("Image upload failed"));
        }
      );
    });
  }

  static async deleteImage(fileId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      imagekit.deleteFile(fileId, (error, _) => {
        if (error) return resolve(false);
        return resolve(true);
      });
    });
  }
}
