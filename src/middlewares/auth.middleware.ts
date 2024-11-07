import { Request, Response, NextFunction } from "express";
export const adminAuthMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Chưa đăng nhập' });
    }
};
