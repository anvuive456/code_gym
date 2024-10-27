
// Thiết lập multer cho ảnh đại diện
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: './web/public/uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

export const upload = multer({ storage });
