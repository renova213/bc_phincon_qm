import multer from "multer";
const filterImage = (_, file, cb) => {
    if (!RegExp(/\.(jpg|jpeg|png)$/).exec(file.originalname)) {
        cb(new Error("Only jpg, jpeg, and png image files are allowed"));
    }
    else {
        cb(null, true);
    }
};
const uploadSingle = multer({
    storage: multer.memoryStorage(),
    fileFilter: filterImage,
    limits: { fileSize: 1 * 1024 * 1024 },
}).single("image");
export default { uploadSingle };
