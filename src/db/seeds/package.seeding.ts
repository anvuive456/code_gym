import { Factory, Seeder } from "typeorm-seeding";
import { Branch } from "@/src/entities/branch.entity";
import { FitnessPackage } from "@/src/entities/fitness_package.entity";

export default class FitnessPackageSeeder implements Seeder {
    public async run(factory: Factory): Promise<void> {
        // Tạo các bản ghi FitnessPackage trước để có dữ liệu cho Branch liên kết
        const fitnessPackages = await FitnessPackage.find(); // Tạo 10 FitnessPackage

        // Tạo các Branch và liên kết với FitnessPackage
        await factory(FitnessPackage)()
            .map(async FitnessPackage => {   
                return FitnessPackage;
            })
            .createMany(10); // Tạo 10 Branch
    }
}
