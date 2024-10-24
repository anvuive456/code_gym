import Logger from "@config/logger";
import MysqlDataSource from "@db/datasource";
import { NextFunction, Request, Response } from "express";

const dbMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const db = MysqlDataSource();
    if (!db.isInitialized) {
        try {
            // Attach AppDataSource vào req để dùng trong các route khác
            req.db = await db.initialize();
            Logger.info("Data Source has been initialized!");
            next(); // Tiếp tục với request
        } catch (error) {
            Logger.error("Error during Data Source initialization", error);
            res.status(500).json({
                message: `Cannot establish database: ${error}`,
            });
        }
    }
};

export default dbMiddleware;
