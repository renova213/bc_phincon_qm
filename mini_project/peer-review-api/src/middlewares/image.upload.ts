import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

const imageFileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const allowedTypes = /jpeg|jpg|png/;
  const isValid = allowedTypes.test(file.mimetype);

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, and .png image files are allowed"));
  }
};

const uploadSingle = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: imageFileFilter,
}).single("image");

export default { uploadSingle };
