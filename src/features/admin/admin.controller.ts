import { User } from "@entities/user.entity";
import { BaseController } from "@interfaces/controller.interface";
import { Request, Response } from "express";

class AdminController extends BaseController {
    protected getBasePath(): string {
        return "/admin";
    }

    protected initRoutes(): void {
        this.router.get(`${this.getBasePath()}/signin`, this.signInView);
        this.router.post(`${this.getBasePath()}/signin`, this.signIn);
    }

    private async signInView(req: Request, res: Response) {
        return res.render("admin/signin", {
            error: req.query.error,
        });
    }

    private async signIn(req: Request, res: Response) {
        const { username, password } = req.body;

        const db = req.db;

        const user = await db.getRepository(User).findOneBy({
            username,
        });

        if (user) {
            req.session.user = {
                id: user.id,
                role: user.role,
                username: user.username,
            }; // Lưu thông tin người dùng vào session
            res.redirect("/admin/dashboard");
        } else {
            res.redirect("/admin/signin?error=Invalid credentials");
        }
    }
}

export default AdminController;
