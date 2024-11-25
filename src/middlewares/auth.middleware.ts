import { Request, Response, NextFunction } from "express";
import Logger from "../config/logger";
export const adminAuthMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: "Chưa đăng nhập" });
    }
};

export const userAuthMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    Logger.info(req.session.user);
    if (req.session.user) {
        next();
    } else {
        res.redirect("/user/signin");
    }
};
