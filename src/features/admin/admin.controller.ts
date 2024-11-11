import { User } from "@entities/user.entity";
import { BaseController } from "@interfaces/controller.interface";
import { Request, Response } from "express";
import { Branch } from "@entities/branch.entity";
import { FitnessPackage } from "@entities/fitness_package.entity";
import { Promotion } from "@entities/promotion.entity";
import bcrypt from "bcrypt";
import AdminDashboard from "../../../web/views/admin/AdminDashboard.vue";
import AdminLogin from "../../../web/views/admin/AdminLogin.vue";
import AdminUsers from "../../../web/views/admin/AdminUsers.vue";
import { Role } from "@entities/role.entity";

class AdminController extends BaseController {
    protected getBasePath(): string {
        return "/admin";
    }

    protected initRoutes(): void {
        this.router.get(`${this.getBasePath()}/signin`, this.signInView);
        this.router.post(`${this.getBasePath()}/signin`, this.signIn);
        // this.router.post(`${this.getBasePath()}/signin`,(req)=>{}, this.signIn);
        this.router.get(`${this.getBasePath()}/`, this.viewHomePage);
        this.router.get(`${this.getBasePath()}/users`, this.viewUsers);
    }
    viewUsers(req: Request, res: Response) {
        super.renderVue(req, res, AdminUsers);
    }

    private async viewHomePage(req: Request, res: Response) {
        if (!req.session.user) {
            return res.redirect("/admin/signin");
        }

        let branches: Branch[] = [
            {
                id: 1,
                name: "Code gym q8",
                address: "Quận 8 - HCM",
                lat: 0,
                fitnesspackages: [new FitnessPackage()],
                lng: 0,
                promotions: [new Promotion()],
                users: [],
            },
            {
                id: 2,
                name: "Code gym q11",
                address: "Quận 11 - HCM",
                lat: 0,
                fitnesspackages: [new FitnessPackage()],
                lng: 0,
                promotions: [new Promotion()],
                users: [],
            },
        ];

        await super.renderVue(req, res, AdminDashboard, { br: branches });
        // return res.render("admin/home_page", { title: "Home Page", branches });
    }

    private async signOut(req: Request, res: Response) {
        req.session.destroy((err: any) => {
            if (!err) {
                return res.redirect("/admin/signin");
            }
        });
    }

    private async signInView(req: Request, res: Response) {
        return super.renderVue(req, res, AdminLogin);
    }

    private async signIn(req: Request, res: Response) {
        const { username, password } = req.body;

        const db = req.db;
        const user = await db.getRepository(User).findOneBy({
            username,
            role: Role.admin,
        });
        console.log(bcrypt.hashSync(password, 10), user?.password);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            res.status(401).json({
                message: "Đăng nhập thất bại",
            });
            return;
        }
        if (user) {
            req.session.user = {
                id: user.id,
                role: user.username,
                username: user.username,
            }; // Lưu thông tin người dùng vào session
        }
        res.json({
            message: "Đăng nhập thành công",
        });
    }
}

export default AdminController;
