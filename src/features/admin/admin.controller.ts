import { User } from "@entities/user.entity";
import { BaseController } from "@interfaces/controller.interface";
import { Request, Response } from "express";
import { title } from "process";

class AdminController extends BaseController {
    protected getBasePath(): string {
        return "/admin";
    }

    protected initRoutes(): void {
        this.router.get(`${this.getBasePath()}/signin`, this.signInView);
        // this.router.post(`${this.getBasePath()}/signin`,(req)=>{}, this.signIn);
        this.router.post(`${this.getBasePath()}/signin`,  this.signIn);
        this.router.get(`${this.getBasePath()}/`, this.viewHomePage);
    }
    private async viewHomePage(req: Request, res: Response) {
        // let data = req.db;
        // data.getRepository(User).find;
        return res.render('admin/home_page',{title:"Home Page",
            // data:data
        });
    }
    private async signOut(req: Request, res: Response) {
        req.session.destroy((err: any) => {
            if(!err){
                return res.redirect("/admin/signin");
            }
        });
    }

    private async signInView(req: Request, res: Response) {
        return res.render("admin/signin", {
            error: req.query.error,
            title: "Admin Panel",
        });
    }

    private async signIn(req: Request, res: Response) {
        const { username, password } = req.body;

        const db = req.db; 
        const user = await db.getRepository(User).findOneBy({
            username,
        });

        console.log('user name ',user?.username);
        console.log('password ',user?.password);
        if (user) {
            console.log('user name ',username);
            req.session.user = {
                id: user.id,
                role: user.password,
                username: user.username,
                password:user.password
            }; // Lưu thông tin người dùng vào session
            res.redirect("/admin");
        } else {
            res.redirect("/admin/signin?error=Invalid credentials");
        }
    }
}

export default AdminController;
