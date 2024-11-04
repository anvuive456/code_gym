import { User } from "@entities/user.entity";
import { BaseController } from "@interfaces/controller.interface";
import { Request, Response } from "express"; 
import { Branch } from "@entities/branch.entity";
import { FitnessPackage } from "@entities/fitness_package.entity";
import { Promotion } from "@entities/promotion.entity";  
import AdminLogin from "../../../web/views/admin/AdminLogin.vue";
class AdminController extends BaseController {
    protected getBasePath(): string {
        return "/admin";
    }

    protected initRoutes(): void {
        this.router.get(`${this.getBasePath()}/signin`, this.signInView);
        this.router.post(`${this.getBasePath()}/signin`, this.signIn);
        // this.router.post(`${this.getBasePath()}/signin`,(req)=>{}, this.signIn);
        this.router.get(`${this.getBasePath()}/`, this.viewHomePage);
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
        
        await super.renderVue(req, res, AdminLogin);
        

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
        // return res.render("admin/signin", {
        //     error: req.query.error,
        //     title: "Admin Panel",
        // });
        return  super.renderVue(req,res,AdminLogin);
    }

    private async signIn(req: Request, res: Response) {
        const { username, password } = req.body;

        const db = req.db;
        const user = await db.getRepository(User).findOneBy({
            username,
        });
        // if (!user || !await bcrypt.compare(password, user.password)){
        //     return res.redirect("/admin/signin?error=Invalid credentials");
        // }
        if (user) {
            req.session.user = {
                id: user.id,
                role: user.username,
                username: user.username,
            }; // Lưu thông tin người dùng vào session
        }
        res.redirect("/admin");
    }
}
export default AdminController;
