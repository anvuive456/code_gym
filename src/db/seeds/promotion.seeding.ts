import { Factory, Seeder } from "typeorm-seeding";
import { Branch } from "@/src/entities/branch.entity";
import { FitnessPackage } from "@/src/entities/fitness_package.entity";
import { Promotion } from "@/src/entities/promotion.entity";
import { faker } from "@faker-js/faker";

export default class PromotionSeeder implements Seeder {
    public async run(factory: Factory): Promise<void> {
        // // Lấy tất cả các Branch và FitnessPackage hiện có
        // const branches = await Branch.find();
        // const fitnessPackages = await FitnessPackage.find();
        // // Tạo 10 Promotion và liên kết với các Branch và FitnessPackage ngẫu nhiên
        // await factory(Promotion)()
        //     .map(async promotion => {
        //         // Gán các Branch và FitnessPackage ngẫu nhiên cho mỗi Promotion
        //         promotion.branches = faker.helpers.arrayElements(branches, 3); // Chọn ngẫu nhiên 3 Branch
        //         promotion.fitnesspackages = faker.helpers.arrayElements(
        //             fitnessPackages,
        //             2,
        //         ); // Chọn ngẫu nhiên 2 FitnessPackage
        //         return promotion;
        //     })
        //     .createMany(10); // Tạo 10 Promotion
    }
}
