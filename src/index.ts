import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Logger from "@config/logger";
import morganMiddleware from "@middlewares/morgan.middleware";
import session from "express-session";
import dbMiddleware from "@middlewares/db.middleware";
import path from "path";
import * as glob from "glob";
import expressEjsLayouts from "express-ejs-layouts";
import AdminController from "@features/admin/admin.controller";

async function loadControllers(app: Express) {
    // Tìm tất cả các file controller trong folder features/**/*.controller.ts
    const controllers = await glob.glob(
        path.join(__dirname, "features","**","*.controller.{ts,js}"),
        {
            // dotRelative: true,
            posix: true,
        }
    );

    // Duyệt qua từng file controller và import nó
    for (const controller of controllers) {
        // Sử dụng import() để nạp module
        const controllerModule = await import(controller);

        // Kiểm tra xem có lớp controller nào được xuất ra không
        const ControllerClass = controllerModule.default;

        if (ControllerClass) {
            // Tạo instance của controller
            const controllerInstance = new ControllerClass();
            // Đăng ký routes từ controller
            app.use(controllerInstance.router);
            Logger.info(`Loaded ${ControllerClass.name} from ${controller}`);
        } else {
            console.error(
                `Controller ${controller} does not have default export`,
            );
        }
    }

    // Duyệt các route và show ra
    app._router.stack
        .filter((r: any) => r.route)
        .map(
            (r: any) =>
                Object.keys(r.route.methods)[0].toUpperCase().padEnd(7) +
                r.route.path,
        )
        .forEach(Logger.info);
}

async function main() {
    dotenv.config();

    const app: Express = express();
    const port = process.env.PORT || 3000;
    app.set("port", port);

    // Cấu hình để sử dụng EJS làm view engine
    app.set("view engine", "ejs");
    app.set("views", path.resolve("web", "views")); // Đường dẫn đến thư mục views
    app.use(expressEjsLayouts);
    app.set("layout", "layout/main_layout");


    // Cấu hình compile SCSS thành CSS
    app.use(
        require("sass-middleware")({
            src: path.resolve("web", "public", "scss"), // Thư mục chứa file SCSS
            dest: path.resolve("web", "public", "css"), // Thư mục chứa file CSS được biên dịch
            debug: true, // Hiển thị log khi biên dịch SCSS
            outputStyle: "compressed", // Nén CSS
            prefix: "/css", // Đường dẫn ảo đến CSS
        }),
    );
    // Cấu hình static folder cho các tài nguyên CSS, JS, Images
    app.use(express.static(path.resolve("web", "public")));

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
    app.use(dbMiddleware);

    loadControllers(app);
    // app.use(new AdminController().router);
    app.listen(port, () => {
        Logger.info(`Server is up and running @ http://localhost:${port}`);
    });
}

main();
