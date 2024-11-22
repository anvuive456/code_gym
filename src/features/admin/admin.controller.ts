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
import AdminOverview from "../../../web/views/admin/AdminOverview.vue";
import { Role } from "@entities/role.entity";
import { UpdatePromotion } from "@/src/dto/update-promotion.dto";
import { UpdateUser } from "@/src/dto/update-user.dto";
import { Profile } from "@entities/profile.entity";
import Logger from "@config/logger";

class AdminController extends BaseController {
    protected getBasePath(): string {
        return "/admin";
    }

    protected initRoutes(): void {
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
        this.router.post(`${this.getBasePath()}/users`, this.getUsers);
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
        this.router.put(`${this.getBasePath()}/users/:id`, this.updateUser);

        //Promotion
        this.router.post(
            `${this.getBasePath()}/promotions`,
            async (req, res) => {
                const data = await Promotion.find({
                    relations: ["branches", "packages"],
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
            this.updatePromotion,
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

        //Overvieww
        this.router.get(`${this.getBasePath()}`, (req, res) => {
            super.renderVue(
                req,
                res,
                AdminOverview,
                {},
                {
                    disableBS: true,
                    additionalLinks: [
                        `https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css`,
                    ],
                },
            );
        });
        this.router.post(`${this.getBasePath()}/overview`, this.getOverview);
    }

    async getOverview(req: Request, res: Response) {
        const counts = await req.db.transaction(async manager => {
            const branchCount = await manager.count(Branch);
            const promotionCount = await manager.count(Promotion);
            const packageCount = await manager.count(FitnessPackage);
            const userCount = await manager.count(User);

            const userRoles = await manager
                .createQueryBuilder(User, "user")
                .select("user.role", "role")
                .addSelect("COUNT(*)", "count")
                .groupBy("user.role")
                .getRawMany();

            return {
                branch: branchCount,
                promotion: promotionCount,
                package: packageCount,
                user: userCount,
            };
        });

        res.status(200).json({
            counts,
        });
    }

    async getUsers(req: Request<{}, {}, {}, { role: Role }>, res: Response) {
        try {
            const { role } = req.query;
            const data = await User.find({
                relations: ["profile", "branch"],
                where: {
                    role,
                },
            });

            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ message: `Không thể lấy dữ liệu ${e}` });
        }
    }

    async updateUser(
        req: Request<{ id: number }, {}, UpdateUser>,
        res: Response,
    ) {
        const { id } = req.params;
        console.log("update id", id);
        const data = req.body;
        const find = await Profile.findOne({
            where: {
                id,
            },
        });

        if (!find) {
            res.status(404).json({
                message: "Không tìm thấy dữ liệu",
            });
            return;
        }

        await Profile.createQueryBuilder()
            .update()
            .set({
                email: data.email,
                gender: data.gender,
                name: data.name,
                phone: data.phone,
                photo: data.photo,
            })
            .where("id = :id", { id })
            .execute();

        res.status(200).json({
            message: "Update thành công",
        });
    }

    async updatePromotion(
        req: Request<{ id: number }, {}, UpdatePromotion>,
        res: Response,
    ) {
        try {
            const data = req.body;
            const { id } = req.params;

            const find = await Promotion.findOne({
                where: {
                    id: Number(id),
                },
            });

            if (!find) {
                res.status(404).json({
                    message: "Không tìm thấy dữ liệu",
                });
                return;
            }

            if (data.branches) {
                const actualRelationships = await Promotion.createQueryBuilder()
                    .relation(Promotion, "branches")
                    .of(find)
                    .loadMany();

                await Promotion.createQueryBuilder()
                    .relation(Promotion, "branches")
                    .of({
                        id,
                    })
                    .addAndRemove(
                        data.branches,
                        actualRelationships.map(e => e.id),
                    );
            }

            if (data.packages) {
                const actualRelationships = await Promotion.createQueryBuilder()
                    .relation(Promotion, "packages")
                    .of(find)
                    .loadMany();

                await Promotion.createQueryBuilder()
                    .relation(Promotion, "packages")
                    .of({
                        id,
                    })
                    .addAndRemove(
                        data.packages,
                        actualRelationships.map(e => e.id),
                    );
            }
            await Promotion.createQueryBuilder()
                .update()
                .set({
                    name: data.name,
                    description: data.description,
                    discountPercentage: data.discountPercentage,
                    endDate: data.endDate,
                    startDate: data.startDate,
                })
                .where("id = :id", { id })
                .execute();

            res.status(200).json({
                message: "Update thành công",
            });
        } catch (e) {
            res.status(400).json({
                message: `"Update không thành công:${e}"`,
            });
        }
    }

    private async getBranches(req: Request, res: Response) {
        const branches = await Branch.find({
            relations: ["fitnesspackages", "promotions", "users"],
        });

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
        super.renderVue(
            req,
            res,
            AdminUsers,
            {},
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

        await super.renderVue(
            req,
            res,
            AdminBranch,
            {},
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
            username: username,
            role: Role.admin,
        });
        if(!user) {
            res.status(404).json({
                message:'Không tìm thấy người dùng'
            })
            return ;
        }

        if (!bcrypt.compareSync(password, user.password)) {
            res.status(401).json({
                message: "Sai mk",
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
