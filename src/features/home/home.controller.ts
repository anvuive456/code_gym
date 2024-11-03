import { BaseController } from "@interfaces/controller.interface";
import { Request, Response } from "express";
import { SignUpDTO } from "../../dto/sign-up.dto";
import { User } from "@entities/user.entity";
import { Role } from "@entities/role.entity";
import { Profile } from "@entities/profile.entity";
import { UpdateProfileDto } from "../../dto/update-profile.dto";
import { upload } from "@middlewares/upload.middleware";
import Home from "../../../web/views/user/Home.vue";
import About from "../../../web/views/user/About.vue";
import Feature from "../../../web/views/user/Feature.vue";
import Contact from "../../../web/views/user/Contact.vue";
import SignUp from "../../../web/views/user/SignUp.vue";
import Blog from "../../../web/views/user/Blog.vue";
import Branch from "../../../web/views/user/Branch.vue";

class HomeController extends BaseController {
    protected getBasePath(): string {
        return "";
    }

    protected initRoutes(): void {
        this.router.use(async (req, res, next) => {
            res.locals.active = req.path;
            const message = req.query.message;
            if (message) {
                res.locals.message = message;
            }
            const ses = req.session.user;
            const user = await req.db.getRepository(User).findOne({
                where: { id: ses?.id },
                relations: ["profile"],
            });
            res.locals.userFullName = user?.profile.name;
            next();
        });
        this.router.get(this.getBasePath(), this.index);
        this.router.get(`${this.getBasePath()}/home`, this.viewHome);
        this.router.get(`${this.getBasePath()}/about`, this.viewAbout);
        this.router.get(`${this.getBasePath()}/feature`, this.viewFeature);
        this.router.get(`${this.getBasePath()}/branch`, this.viewBranch);
        this.router.get(`${this.getBasePath()}/contact`, this.viewContact);
        this.router.get(`${this.getBasePath()}/blog`, this.viewBlog);
        this.router.get(`${this.getBasePath()}/signup`, this.viewSignUp);
        this.router.post(`${this.getBasePath()}/signup`, this.signUp);
        this.router.get(`${this.getBasePath()}/signin`, this.viewSignIn);
        this.router.get(`${this.getBasePath()}/signout`, this.signOut);
        this.router.get(`${this.getBasePath()}/profile`, this.viewProfile);
        this.router.post(`${this.getBasePath()}/update-profile`, this.updateProfile);
        this.router.post(`${this.getBasePath()}/update-photo`, upload.single("photo"), this.updateLogo);
    }

    private async viewHome(req: Request, res: Response): Promise<void> {
        const db = req.db;
        await super.renderVue(req, res, Home, {
            title: "Muahahahah",
        }, {
            title: "Trang chủ",
        });
    }

    private async viewAbout(req: Request, res: Response): Promise<void> {
        return super.renderVue(req, res, About, {
            branches: [{
                name: "hello world",
            }],
        }, {
            title: "Về chúng tôi",
        });
    }

    private async viewFeature(req: Request, res: Response) {
        const db = req.db;
        return super.renderVue(req, res, Feature);
    }

    private async viewBlog(req: Request, res: Response) {
        return super.renderVue(req, res, Blog, {});
    }

    private async viewBranch(req: Request, res: Response) {
        const branches = [
            {
                title: "Hello world",
            },
            {
                title: "Hello bitch",
            },
        ];
        return super.renderVue(req, res, Branch, {
            branches,
        });
    }

    private async viewContact(req: Request, res: Response) {
        return super.renderVue(req, res, Contact);
    }

    private index(req: Request, res: Response) {
        return res.redirect("/home");
    }

    private viewSignUp(req: Request, res: Response) {
        return super.renderVue(req, res, SignUp);
    }

    private viewSignIn(req: Request, res: Response) {
        return res.render("user/signin", {
            layout: "layout/user_layout",
        });
    }

    private async signUp(req: Request<{}, {}, SignUpDTO>, res: Response) {
        const db = req.db;
        const { username, password, email, phone, name, gender } = req.body;

        // Create a profile for the user
        const profile = new Profile();
        profile.name = name;
        profile.gender = gender;
        profile.photo = "";
        profile.phone = phone;
        await db.getRepository(Profile).save(profile); // Save profile first for the one-to-one relation
        // Create a new user and set properties
        const user = new User();
        user.username = username;
        user.password = password; // Password will be hashed by the @BeforeInsert hook
        user.profile = profile;

        // Save the user
        const result = await db.getRepository(User).save(user);

        req.session.user = {
            id: result.id,
            username: result.username,
            role: result.role,
        };

        return res.redirect("/home?message=Đăng ký thành công");
    }

    private async viewProfile(req: Request, res: Response) {
        const db = req.db;
        const ses = req.session.user;
        const user = await db.getRepository(User).findOne({
            where: {
                id: ses?.id,
            },
            relations: ["profile"],
        });
        return res.render("user/profile", {
            layout: "layout/user_layout",
            profile: user?.profile,
        });
    }

    private async updateProfile(req: Request<{}, {}, UpdateProfileDto>, res: Response) {
        const body = req.body;
        const db = req.db;
        const ses = req.session.user;

    }

    private async updateLogo(req: Request, res: Response) {
        if (req.file) {
            const ses = req.session.user;
            const db = req.db.getRepository(Profile);
            const profile = await db.findOne({
                where: {
                    user: {
                        id: ses?.id,
                    },
                },
            });
            if (profile) {
                // Cập nhật đường dẫn ảnh mới và lưu vào cơ sở dữ liệu
                profile.photo = "/uploads/" + req.file.filename;
                await db.save(profile);
                res.redirect("/profile");
            } else {
                res.status(404).send("Profile not found");
            }
        } else {
            return res.redirect("/profile");
        }
    }

    private async signOut(req: Request, res: Response) {

    }
}


export default HomeController;
