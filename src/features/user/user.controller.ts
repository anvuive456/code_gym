import { User } from "@entities/user.entity";
import { BaseController } from "@interfaces/controller.interface";
import { Request, Response } from "express";
import { Branch } from "@entities/branch.entity";
import { FitnessPackage } from "@entities/fitness_package.entity";
import { Promotion } from "@entities/promotion.entity";
import bcrypt from "bcrypt";
import SignIn from "../../../web/views/user/SignIn.vue";
import About from "../../../web/views/user/About.vue";
import { Role } from "@entities/role.entity";

class UserController extends BaseController {
    protected getBasePath(): string {
        return "/user";
    }

    protected initRoutes(): void {
        this.router.get(`${this.getBasePath()}/signin`, this.signInView);
        this.router.post(`${this.getBasePath()}/signin`, this.signIn);
        // this.router.post(`${this.getBasePath()}/signin`,(req)=>{}, this.signIn);
        this.router.get(`${this.getBasePath()}/`, this.viewHomePage);
    }

    private async viewHomePage(req: Request, res: Response) {
        // if (!req.session.user) {
        console.log("homepage");
        // }
        // let branches: Branch[] = [
        //     {
        //         id: 1,
        //         name: "Code gym q8",
        //         address: "Quận 8 - HCM",
        //         lat: 0,
        //         fitnesspackages: [new FitnessPackage()],
        //         lng: 0,
        //         promotions: [new Promotion()],
        //         users: [],
        //     },
        //     {
        //         id: 2,
        //         name: "Code gym q11",
        //         address: "Quận 11 - HCM",
        //         lat: 0,
        //         fitnesspackages: [new FitnessPackage()],
        //         lng: 0,
        //         promotions: [new Promotion()],
        //         users: [],
        //     },
        // ];

        // await super.renderVue(req, res, AdminDashboard, { br: branches });
        // await super.renderVue(req, res, About);
        // return res.render("admin/home_page", { title: "Home Page", branches });
    }

    private async signOut(req: Request, res: Response) {
        req.session.destroy((err: any) => {
            if (!err) {
                return res.redirect("/admin/signin");
            }
        });
    }
    public static createUser(req: Request, res: Response): void {
        const { name, phone } = req.body;
        // Kiểm tra nếu thiếu tên hoặc số điện thoại
        if (!name || !phone) {
            res.status(400).json({
                message: "Thiếu thông tin tên hoặc số điện thoại",
            });
            return;
        }
        // Xử lý thông tin người dùng
        console.log(`Tên: ${name}, Số điện thoại: ${phone}`);
        // Trả về phản hồi thành công
        res.status(200).json({
            message: "Thông tin người dùng đã được tiếp nhận!",
        });
    }
    private async signInView(req: Request, res: Response) {
        return super.renderVue(req, res, SignIn);
    }

    // private async signOut(req: Request, res: Response) {
    //     req.session.destroy(err => {
    //         if (err)
    //             return res.status(500).json({ message: "Không thể đăng xuất" });
    //         res.clearCookie("connect.sid"); // Xóa cookie session
    //         res.json({ message: "Đăng xuất thành công" });
    //     });
    // }

    private async signIn(req: Request, res: Response) {
        const db = req.db;
        const { username, password } = req.body;
        const user = await db.getRepository(User).findOne({
            where: {
                username,
            },
        });
        console.log("han user", user);

        if (!user) {
            //|| !bcrypt.compareSync(password, user.password)
            res.status(401).json({
                message: "Đăng nhập thất bại",
            });
            console.log("han tyest failed");
            return;
        }

        req.session.user = user;
        req.session.save();
        res.status(200).json({
            message: "Đăng nhập thành công",
        });
        console.log("han tyest success");
    }
    // private async signIn(req: Request, res: Response) {
    //     const { username, password } = req.body;
    //     console.log("user role", username, password);
    //     // if (role !== "user") {
    //     //     res.status(400).json({ message: "Role không hợp lệ" });
    //     // }
    //     const db = req.db;
    //     const user = await db.getRepository(User).findOneBy({
    //         username: username,
    //         password: password,
    //         // role: Role.user,
    //     });
    //     console.log("han test", user);
    //     if (user != null) {
    //         res.json({
    //             message: "Đăng nhập thành công",
    //         });
    //         console.log("success");
    //         return super.renderVue(req, res, About);
    //     } else {
    //         console.log("success failed");
    //         res.json({
    //             message: "Đăng nhập khong thanh công",
    //         });
    //     }
    // }
}

export default UserController;
