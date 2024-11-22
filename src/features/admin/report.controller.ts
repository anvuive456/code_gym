import { User } from "@entities/user.entity";
import { Request, Response } from "express";
import { BaseController } from "@interfaces/controller.interface";
import { Between, Not } from "typeorm";
import Logger from "@config/logger";

export class ReportController extends BaseController {
    protected getBasePath(): string {
        return "/report";
    }
    protected initRoutes(): void {
        this.router.get(`${this.getBasePath()}/users`, this.getUserReport);
    }

    async getUserReport(
        req: Request<{}, {}, {}, { period: "week" | "month" | "year" }>,
        res: Response,
    ) {
        try {
            const { period = "week" } = req.query;
            const currentDate = new Date();
            let startDate: Date,
                endDate: Date,
                grouping: string,
                formatDate: (date: Date) => string;

            // Auto-calculate date range and grouping logic
            if (period === "week") {
                const dayOfWeek = currentDate.getDay(); // 0 (Sunday) - 6 (Saturday)
                const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Tính từ thứ 2
                startDate = new Date(currentDate);
                startDate.setDate(currentDate.getDate() + diffToMonday);
                startDate.setHours(0, 0, 0, 0); // Đặt thời gian về 00:00:00

                endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 6); // Chủ nhật (thứ 2 + 6)
                endDate.setHours(23, 59, 59, 999);

                grouping = `DATE(user.createdAt)`; // Nhóm theo ngày
                formatDate = date => date.toISOString().split("T")[0]; // Định dạng ngày
            } else if (period === "month") {
                startDate = new Date(
                    currentDate.getUTCFullYear(),
                    currentDate.getUTCMonth(),
                    1,
                ); // Ngày đầu tháng
                startDate.setHours(0, 0, 0, 0);

                endDate = new Date(
                    currentDate.getUTCFullYear(),
                    currentDate.getUTCMonth() + 1,
                    0,
                ); // Ngày cuối tháng
                endDate.setHours(23, 59, 59, 999);

                grouping = `DATE(user.createdAt)`; // Nhóm theo ngày
                formatDate = date => date.toISOString().split("T")[0]; // Định dạng ngày
            } else if (period === "year") {
                startDate = new Date(currentDate.getFullYear(), 0, 1); // January 1st
                endDate = new Date(currentDate.getFullYear() + 1, 0, 1); // January 1st of the next year
                grouping = `DATE(user.createdAt)`;
                formatDate = date =>
                    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
            } else {
                throw new Error("Invalid period specified");
            }

            // Query Builder
            const result = await User.createQueryBuilder("user")
                .select(`${grouping}`, "groupBy")
                .addSelect("COUNT(user.id)", "createdCount")
                .addSelect(
                    "SUM(CASE WHEN user.deletedAt IS NOT NULL THEN 1 ELSE 0 END)",
                    "deletedCount",
                )
                .addSelect(
                    "SUM(CASE WHEN user.deletedAt IS NULL THEN 1 ELSE 0 END)",
                    "activeCount",
                )
                .where("user.createdAt BETWEEN :startDate AND :endDate", {
                    startDate,
                    endDate,
                })
                .groupBy(grouping)
                .orderBy("groupBy", "ASC")
                .getRawMany();

            // Create full range of dates
            const dateRange: Array<string> = [];
            let current = new Date(startDate);

            while (current < endDate) {
                dateRange.push(formatDate(current));
                if (period === "year") {
                    current.setMonth(current.getMonth() + 1);
                } else {
                    current.setDate(current.getDate() + 1);
                }
            }

            // Map results and fill missing dates
            const dataMap = result.reduce(
                (map: any, row: any) => {
                    // map[row.groupBy] = {
                    //     createdCount: parseInt(row.createdCount, 10),
                    //     deletedCount: parseInt(row.deletedCount, 10),
                    //     activeCount: parseInt(row.activeCount, 10),
                    // };
                    Logger.info(row);
                    return {
                        [formatDate(row.groupBy)]: {
                            createdCount: parseInt(row.createdCount, 10),
                            deletedCount: parseInt(row.deletedCount, 10),
                            activeCount: parseInt(row.activeCount, 10),
                        },
                    };
                },
                {} as Record<
                    string,
                    {
                        createdCount: number;
                        deletedCount: number;
                        activeCount: number;
                    }
                >,
            );

            const finalData = dateRange.map(date => {
                Logger.info("mapping date", date, dataMap);
                return {
                    groupBy: date,
                    createdCount: dataMap[date]?.createdCount || 0,
                    deletedCount: dataMap[date]?.deletedCount || 0,
                    activeCount: dataMap[date]?.activeCount || 0,
                };
            });

            // Send response
            res.status(200).json({
                period,
                startDate,
                endDate,
                data: finalData,
            });
        } catch (error) {
            console.error("Error fetching user statistics:", error);
            res.status(500).json({
                message: "Failed to fetch user statistics",
            });
        }
    }
}
