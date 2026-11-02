
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDirectory = path.join(__dirname, "..", "uploads");

fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadDirectory);
    },

    filename: (req, file, callback) => {
        const uniqueName =
            Date.now() + "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname).toLowerCase();

        callback(null, uniqueName);
    }
});

const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp"
];

const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (req, file, callback) => {
        if (!allowedTypes.includes(file.mimetype)) {
            const error = new Error(
                "Only PDF, JPG, PNG, GIF and WEBP files are allowed."
            );

            error.status = 400;
            return callback(error);
        }

        callback(null, true);
    }
});

module.exports = upload;
