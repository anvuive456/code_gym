import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Logger from "@config/logger";
import morganMiddleware from "@middlewares/morgan.middleware";
import session from "express-session";
import path from "path";
import AdminController from "@features/admin/admin.controller";
import HomeController from "@features/home/home.controller";
import { ReportController } from "@features/admin/report.controller";

export async function main() {
    dotenv.config();

    const app: Express = express();
    const port = process.env.PORT || 3000;
    app.set("port", port);

    app.use(express.static(path.resolve("public")));
    app.use("/dist/client", express.static(path.resolve("dist", "client")));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); // Để xử lý form data

    const option = {
        host: "localhost",
        port: 3306,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    };
    // Cấu hình session
    const sessionStore = new (session.MemoryStore || session.Store)(); // Sử dụng memory store (có thể thay bằng MySQLStore)

    app.use(
        session({
            secret: process.env.SESSION_SECRET || "secret",
            resave: false,
            saveUninitialized: true,
            store: sessionStore, // Nếu dùng MySQL, thay thế bằng new MySQLStore({})
            cookie: {
                secure: false,
                maxAge: 1000 * 60 * 60 * 24, // Thời gian sống của cookie (1 ngày)
            },
        }),
    );

    app.use(morganMiddleware);
    const { default: dbMiddleware } = await import(
        "@middlewares/db.middleware"
    );
    app.use(dbMiddleware);

    // await loadControllers(app);
    app.use(new AdminController().router);
    app.use(new HomeController().router);
    app.use(new ReportController().router);

    app.listen(port, () => {
        Logger.info(`Server is up and running @ http://localhost:${port}`);
    });
}

main();
