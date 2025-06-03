import { existsSync, mkdirSync } from "fs";
import multer from "multer";
import path from "path";

// Define the temporary upload directory within /tmp
// In serverless environments, /tmp is usually the only writable directory.
const uploadDir = path.join("/tmp", "uploads"); // <--- CHANGE THIS LINE

// Create uploads directory in /tmp if it doesn't exist
// This will run once when the function instance initializes, or if it's a cold start.
if (!existsSync(uploadDir)) {
    try {
        mkdirSync(uploadDir, { recursive: true });
        console.log(`Successfully created directory: ${uploadDir}`);
    } catch (err) {
        console.error(`Error creating directory ${uploadDir}:`, err);
        // If directory creation fails here, multer will likely fail too.
        // You might want to throw the error or handle it more gracefully
        // depending on your application's needs.
        // For now, we'll let multer attempt it, but it's good to be aware.
    }
}

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Ensure the directory exists before trying to save a file.
        // This is a good safeguard, though the initial check should handle most cases.
        if (!existsSync(uploadDir)) {
            try {
                mkdirSync(uploadDir, { recursive: true });
            } catch (mkdirErr) {
                return cb(mkdirErr); // Pass error to multer
            }
        }
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
    // You might want to add limits, e.g.:
    // limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});