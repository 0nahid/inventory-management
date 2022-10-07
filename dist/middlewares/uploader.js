"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
exports.uploader = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const supportedImage = /png|jpg|jpeg/;
        const extname = supportedImage.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = supportedImage.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        else {
            cb(new Error("Only images are allowed"));
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});
