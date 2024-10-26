import { BaseController } from "@interfaces/controller.interface";
import { Request, Response } from "express";

class HomeController extends BaseController {
    protected getBasePath(): string {
        return "";
    }

    protected initRoutes(): void {
        this.router.get(this.getBasePath(), this.viewHome);
    }

    private async viewHome(req: Request, res: Response): Promise<void> {
        const db = req.db;

        return res.render('user/home',{
            layout: 'layout/user_layout',

        });
    }

}


export default HomeController;
