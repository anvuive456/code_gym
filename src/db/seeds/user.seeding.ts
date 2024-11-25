import { Factory, Seeder } from "typeorm-seeding";
import { User } from "@entities/user.entity";
import { Profile } from "@/src/entities/profile.entity";
import { FitnessPackage } from "@/src/entities/fitness_package.entity";
import { Branch } from "@/src/entities/branch.entity";

export default class CreateUserSeed implements Seeder {
    public async run(factory: Factory): Promise<void> {
        await factory(User)()
            .map(async user => {
                const profile = await factory(Profile)().create();
                const fitness = await factory(FitnessPackage)().create();
                const branch = await factory(Branch)().create();
                user.profile = profile;
                user.fitnessPackage = fitness;
                user.branch = branch;
                return user;
            })
            .createMany(10);
    }
}
