import { User } from "@entities/user.entity";
import { BaseController } from "@interfaces/controller.interface";
import { Request, Response } from "express";
import { Branch } from "@entities/branch.entity";
import { FitnessPackage } from "@entities/fitness_package.entity";
import { Promotion } from "@entities/promotion.entity";
import bcrypt from "bcrypt";
import AdminBranch from "../../../web/views/admin/AdminBranch.vue";
import AdminLogin from "../../../web/views/admin/AdminLogin.vue";
import AdminUsers from "../../../web/views/admin/AdminUsers.vue";
import AdminPromotions from "../../../web/views/admin/AdminPromotions.vue";
import AdminPackages from "../../../web/views/admin/AdminPackages.vue";
import { Role } from "@entities/role.entity";

class AdminController extends BaseController {
    protected getBasePath(): string {
        return "/admin";
    }

    protected initRoutes(): void {
        this.router.get(`${this.getBasePath()}`, (req, res) =>
            res.redirect("/admin/branches"),
        );
        this.router.get(`${this.getBasePath()}/signin`, this.signInView);
        this.router.post(`${this.getBasePath()}/signin`, this.signIn);
        // this.router.post(`${this.getBasePath()}/signin`,(req)=>{}, this.signIn);
        this.router.get(`${this.getBasePath()}/branches`, this.viewBranches);
        this.router.get(`${this.getBasePath()}/users`, this.viewUsers);
        this.router.get(
            `${this.getBasePath()}/promotions`,
            this.viewPromotions,
        );
        this.router.get(`${this.getBasePath()}/packages`, this.viewPackages);

        //Branch
        this.router.post(`${this.getBasePath()}/branches`, this.getBranches);
        this.router.delete(
            `${this.getBasePath()}/branches/:id`,
            this.deleteBranch,
        );
        this.router.put(
            `${this.getBasePath()}/branches/:id`,
            this.updateBranch,
        );

        //User
        this.router.post(
            `${this.getBasePath()}/users`,
            this.asyncWrapper(
                async (_: Request, __: Response, next: Function) => {
                    setTimeout(next, 2000);
                },
            ),
            async (req, res) => {
                const data = await User.find({
                    where: {
                        deletedAt: undefined,
                    },

                    relations: ["profile"],
                });

                res.status(200).json(data);
            },
        );
        this.router.delete(
            `${this.getBasePath()}/users/:id`,
            async (req, res) => {
                await User.update(
                    {
                        id: Number(req.params.id),
                    },
                    {
                        deletedAt: new Date(),
                    },
                );

                res.status(200).json({
                    message: "Đã xoá user",
                });
            },
        );
        this.router.put(`${this.getBasePath()}/users/:id`, async (req, res) => {
            const data = req.body;
            await User.update(
                {
                    id: Number(req.params.id),
                },
                data,
            );

            res.status(200).json({
                message: "Update thành công",
            });
        });

        //Promotion
        this.router.post(
            `${this.getBasePath()}/promotions`,
            async (req, res) => {
                const data = await Promotion.find({
                    where: {
                        deletedAt: undefined,
                    },
                });

                res.status(200).json(data);
            },
        );
        this.router.delete(
            `${this.getBasePath()}/promotions/:id`,
            async (req, res) => {
                await Promotion.update(
                    {
                        id: Number(req.params.id),
                    },
                    {
                        deletedAt: new Date(),
                    },
                );

                res.status(200).json({
                    message: "Đã xoá promotion",
                });
            },
        );
        this.router.put(
            `${this.getBasePath()}/promotions/:id`,
            async (req, res) => {
                const data = req.body;
                await Promotion.update(
                    {
                        id: Number(req.params.id),
                    },
                    data,
                );

                res.status(200).json({
                    message: "Update thành công",
                });
            },
        );

        //Packages
        this.router.post(`${this.getBasePath()}/packages`, async (req, res) => {
            const data = await FitnessPackage.find({
                where: {
                    deletedAt: undefined,
                },
            });

            res.status(200).json(data);
        });
        this.router.delete(
            `${this.getBasePath()}/packages/:id`,
            async (req, res) => {
                await FitnessPackage.update(
                    {
                        id: Number(req.params.id),
                    },
                    {
                        deletedAt: new Date(),
                    },
                );

                res.status(200).json({
                    message: "Đã xoá promotion",
                });
            },
        );
        this.router.put(
            `${this.getBasePath()}/packages/:id`,
            async (req, res) => {
                const data = req.body;
                await FitnessPackage.update(
                    {
                        id: Number(req.params.id),
                    },
                    data,
                );

                res.status(200).json({
                    message: "Update thành công",
                });
            },
        );
    }

    private async getBranches(req: Request, res: Response) {
        const branches = await Branch.find();

        res.status(200).json(branches);
    }

    private async deleteBranch(req: Request, res: Response) {
        await Branch.delete(req.params.id);

        res.status(200).json({
            message: "Xoá chi nhánh thành công",
        });
    }

    private async updateBranch(req: Request, res: Response) {
        const { id } = req.params;
        const { name, address, lat, lng } = req.body;

        try {
            const updatedBranch = await Branch.save({
                id: Number(id),
                name,
                address,
                lat,
                lng,
            });

            res.status(200).json(updatedBranch);
        } catch (error) {
            res.status(500).json({ message: "Error updating branch", error });
        }
    }

    async viewUsers(req: Request, res: Response) {
        const users = await User.find();

        super.renderVue(
            req,
            res,
            AdminUsers,
            {
                users,
            },
            {
                disableBS: true,
                additionalLinks: [
                    `https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css`,
                ],
            },
        );
    }

    async viewPackages(req: Request, res: Response) {
        super.renderVue(
            req,
            res,
            AdminPackages,
            {},
            {
                disableBS: true,
                additionalLinks: [
                    `https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css`,
                ],
            },
        );
    }

    async viewPromotions(req: Request, res: Response) {
        super.renderVue(
            req,
            res,
            AdminPromotions,
            {},
            {
                disableBS: true,
                additionalLinks: [
                    `https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css`,
                ],
            },
        );
    }

    private async viewBranches(req: Request, res: Response) {
        if (!req.session.user) {
            return res.redirect("/admin/signin");
        }

        const branches = await Branch.find();

        await super.renderVue(
            req,
            res,
            AdminBranch,
            { branches },
            {
                disableBS: true,
                additionalLinks: [
                    `https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css`,
                ],
            },
        );
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
        return super.renderVue(
            req,
            res,
            AdminLogin,
            {},
            {
                disableBS: true,
                additionalLinks: [
                    `https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css`,
                ],
            },
        );
    }

    private async signIn(req: Request, res: Response) {
        const { username, password } = req.body;

        const db = req.db;
        const user = await db.getRepository(User).findOneBy({
            username,
            role: Role.admin,
        });
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
