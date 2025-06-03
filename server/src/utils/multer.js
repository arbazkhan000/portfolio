import { existsSync, mkdirSync } from "fs";
import multer from "multer";
import path from "path";
// Create uploads directory if it doesn't exist
const uploadDir = path.join(process.cwd(), "uploads");
if (!existsSync(uploadDir)) {
mkdirSync(uploadDir, { recursive: true });
}
// Multer configuration
const storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, uploadDir);
},
filename: function (req, file, cb) {
const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
cb(null, uniqueSuffix + path.extname(file.originalname));
},
});
// File filter to allow only images
const fileFilter = (req, file, cb) => {
const allowedImageTypes = [
"image/jpg",
"image/jpeg",
"image/png",
"image/webp",
];
if (allowedImageTypes.includes(file.mimetype)) {
    cb(null, true);
} else {
    cb(new Error("Only JPEG, PNG, WEBP images are allowed"), false);
}
};
// Multer instance with limits
export const upload = multer({
storage: storage,
fileFilter: fileFilter,
});