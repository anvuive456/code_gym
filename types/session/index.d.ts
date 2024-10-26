// types/session.d.ts
import "express-session";

declare module "express-session" {
    //thông tin login cho server
    interface SessionData {
        user: {
            // Định nghĩa kiểu cho user
            id: number; // Hoặc kiểu của ID người dùng
            username: string; // Tên người dùng
            role: string;
        };
    }
}
