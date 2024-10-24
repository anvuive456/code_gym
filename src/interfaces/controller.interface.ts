import { Router, Request, Response, NextFunction } from "express";

export abstract class BaseController {
    public router: Router = Router();

    constructor() {
        this.initRoutes();
    }

    protected abstract getBasePath(): string;

    // Các controller kế thừa phải định nghĩa lại phương thức này
    protected abstract initRoutes(): void;

    // Một số phương thức tiện ích có thể được định nghĩa ở đây
    protected sendResponse(res: Response, statusCode: number, data: any) {
        return res.status(statusCode).json(data);
    }

    protected sendError(res: Response, statusCode: number, message: string) {
        return res.status(statusCode).json({ error: message });
    }

    protected renderView(res: Response, view: string, data?: any) {
        return res.render(view, data);
    }

    // Ví dụ một middleware base có thể được sử dụng chung
    protected asyncWrapper(fn: Function) {
        return (req: Request, res: Response, next: NextFunction) =>
            fn(req, res, next).catch(next);
    }
}
