import { Factory, Seeder } from "typeorm-seeding";
import { Branch } from "@/src/entities/branch.entity";
import { FitnessPackage } from "@/src/entities/fitness_package.entity";

export default class BranchSeeder implements Seeder {
    public async run(factory: Factory): Promise<void> {
        // Tạo các bản ghi FitnessPackage trước để có dữ liệu cho Branch liên kết
        const fitnessPackages = await FitnessPackage.find(); // Tạo 10 FitnessPackage

        // Tạo các Branch và liên kết với FitnessPackage
        await factory(Branch)()
            .map(async branch => {
                branch.fitnesspackages = fitnessPackages
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3); // Chọn ngẫu nhiên 3 FitnessPackage cho mỗi Branch
                return branch;
            })
            .createMany(10); // Tạo 10 Branch
    }
}
