import { User } from "@entities/user.entity";
import { BaseController } from "@interfaces/controller.interface";
import { Request, Response } from "express";
import { Branch } from "@entities/branch.entity";
import { FitnessPackage } from "@entities/fitness_package.entity";
import { Promotion } from "@entities/promotion.entity";
import bcrypt from "bcrypt";
import SignIn from "../../../web/views/user/SignIn.vue";
import Home from "../../../web/views/user/Home.vue";
import About from "../../../web/views/user/About.vue";
import SignUp from "../../../web/views/user/SignUp.vue";
import ProfileUser from "../../../web/views/user/ProfileUser.vue";
import { Role } from "@entities/role.entity";
import { Profile } from "@entities/profile.entity";
import { userAuthMiddleware } from "@middlewares/auth.middleware";
import { UpdateProfileDto } from "../../dto/update-profile.dto";
class UserController extends BaseController {
    protected getBasePath(): string {
        return "/user";
    }

    protected initRoutes(): void {
        this.router.get(`${this.getBasePath()}/signin`, this.signInView);
        this.router.post(`${this.getBasePath()}/signin`, this.signIn);

        this.router.get(
            `${this.getBasePath()}/profile`,
            userAuthMiddleware,
            this.profileView,
        );
        ///session
        this.router.get(`/session`, this.getSession);
        ///session
        this.router.put(`/update-profile-user`, this.updateProfileUser);

        this.router.get(`${this.getBasePath()}/signup`, this.signUpView);
        this.router.post(`${this.getBasePath()}/signup`, this.signUp);
        this.router.get(`${this.getBasePath()}/dash`, this.signInViewDash);
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
    private async signInViewDash(req: Request, res: Response) {
        return super.renderVue(req, res, Home);
    }

    // private async signOut(req: Request, res: Response) {
    //     req.session.destroy(err => {
    //         if (err)
    //             return res.status(500).json({ message: "Không thể đăng xuất" });
    //         res.clearCookie("connect.sid"); // Xóa cookie session
    //         res.json({ message: "Đăng xuất thành công" });
    //     });
    // }
    private async profileView(req: Request, res: Response) {
        return super.renderVue(req, res, ProfileUser);
    }
    private async signUpView(req: Request, res: Response) {
        return super.renderVue(req, res, SignUp);
    }
    private async signIn(req: Request, res: Response) {
        const db = req.db;
        const { username, password } = req.body;
        const user = await db.getRepository(User).findOneBy({
            username: username,
            // role: Role.user,
        });
        console.log("han user", user);
        if (!user) {
            res.status(404).json({
                message: "Không tìm thấy người dùng",
            });
            return;
        }
        if (!bcrypt.compareSync(password, user.password)) {
            res.status(401).json({
                message: "Sai mật khẩu",
            });
            return;
        }

        req.session.user = {
            id: user.id,
            role: user.role,
            username: user.username,
        };

        req.session.save();

        res.status(200).json({
            message: "Đăng nhập thành công",
        });
    }
    private async updateProfileUser(
        req: Request<{}, {}, UpdateProfileDto>,
        res: Response,
    ) {
        const body = req.body; //updateprofile
        const ses = req.session.user;

        const { profileId } = await User.createQueryBuilder("user")
            .leftJoin("user.profile", "profile")
            .select("profile.id", "profileId")
            .where("user.id = :userId", { userId: ses?.id })
            .getRawOne();
        // Update Profile bằng Query Builder
        await Profile.createQueryBuilder()
            .update(Profile)
            .set({ email: body.email, phone: body.phone })
            .where("id = :id", { id: profileId })
            .execute();

        //Update Branch của User
        if (body.branch)
            await User.createQueryBuilder()
                .update(User)
                .set({ branch: { id: Number(body.branch!) } }) // Cập nhật branch bằng ID
                .where("id = :userId", { userId: ses?.id })
                .execute();
        // Cập nhật FitnessPackage cho User
        if (body.fitnesspackage)
            await User.createQueryBuilder()
                .update(User)
                .set({ fitnessPackage: { id: Number(body.fitnesspackage) } }) // Chỉ cần ID của FitnessPackage
                .where("id = :userId", { userId: ses?.id }) //userId" lấyy từ đâu v
                .execute();

        res.status(200).json({
            message: "Update thành công",
        });
    }
    private async getSession(req: Request, res: Response) {
        const session = req.session.user;
        if (!session) {
            res.status(200).json({
                username: null,
                email: null,
                fullname: null,
                phone: null,
            });
            return;
        }
        const user = await User.findOne({
            where: { id: session?.id },
            relations: ["profile", "branch", "fitnessPackage"],
        });
        console.log("UserController ~ getSession ~ user:", user);
        res.status(200).json({
            username: user?.username,
            email: user?.profile?.email,
            fullname: user?.profile?.name,
            phone: user?.profile?.phone,
            branch: user?.branch?.name,
            fitnesspackage: user?.fitnessPackage?.name,
        });
    }
    private async signUp(req: Request, res: Response) {
        const db = req.db;
        const {
            username,
            password,
            email,
            gender,
            phone,
            name,
            branch,
            package: fitnessPackage,
        } = req.body;
        const user = await db.getRepository(User).findOneBy({
            username: username,
            // role: Role.user,
        });
        if (user) {
            res.status(400).json({ message: "Tên người dùng đã tồn tại" });
            return;
        }
        const profile = new Profile();
        profile.name = name;
        profile.email = email;
        profile.gender = gender;
        profile.photo = "";
        profile.phone = phone;
        await Profile.save(profile);

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User();
        newUser.username = username;
        newUser.password = hashedPassword;
        newUser.role = Role.user;
        newUser.profile = profile;

        const findBranch = await Branch.findOneBy({
            id: branch,
        });

        if (!findBranch) {
            res.status(400).json({
                message: "Không tìm thấy chi nhánh",
            });
            return;
        }
        newUser.branch = findBranch;
        if (fitnessPackage) {
            const findPackage = await FitnessPackage.findOneBy({
                id: fitnessPackage,
            });

            if (!findPackage) {
                res.status(400).json({
                    message: "Không tìm thấy gói tập",
                });
                return;
            }
            newUser.branch.fitnesspackages.push(findPackage);
        }

        console.log("han user", user);
        try {
            const data = await User.save(newUser); // Lưu thông tin người dùng

            req.session.user = data;
            req.session.save();

            res.status(201).json({ message: "Đăng ký thành công" }); // Trả về phản hồi khi đăng ký thành công
        } catch (error) {
            res.status(500).json({ message: "Đã có lỗi xảy ra" });
        }
        // console.log("han tyest success");
    }
}

export default UserController;
