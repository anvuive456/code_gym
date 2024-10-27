import { BaseController } from "@interfaces/controller.interface";
import { Request, Response } from "express";

class HomeController extends BaseController {
    protected getBasePath(): string {
        return "";
    }

    protected initRoutes(): void {
        this.router.use((req, res, next) => {
            res.locals.active = req.path;
            next();
        });
        this.router.get(this.getBasePath(), (req, res) => {
            return res.redirect("/home");
        });
        this.router.get(`${this.getBasePath()}/home`, this.viewHome);
        this.router.get(`${this.getBasePath()}/about`, this.viewAbout);
        this.router.get(`${this.getBasePath()}/feature`, this.viewFeature);
        this.router.get(`${this.getBasePath()}/class`, this.viewClass);
        this.router.get(`${this.getBasePath()}/contact`, this.viewContact);
        this.router.get(`${this.getBasePath()}/blog`, this.viewBlog);
    }

    private async viewHome(req: Request, res: Response): Promise<void> {
        const db = req.db;

        return res.render("user/home", {
            layout: "layout/user_layout",
        });
    }

    private async viewAbout(req: Request, res: Response): Promise<void> {
        return res.render("user/about", {
            layout: "layout/user_layout",
        });
    }

    private async viewFeature(req: Request, res: Response) {
        const db = req.db;
        return res.render("user/feature", {
            layout: "layout/user_layout",

        });
    }

    private async viewBlog(req: Request, res: Response) {
        return res.render("user/blog", {
            layout: "layout/user_layout",

        });
    }

    private async viewClass(req: Request, res: Response) {
        return res.render("user/class", {
            layout: "layout/user_layout",

        });
    }

    private async viewContact(req: Request, res: Response) {
        return res.render("user/contact", {
            layout: "layout/user_layout",

        });
    }
}


export default HomeController;
