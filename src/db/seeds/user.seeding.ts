import { Factory, Seeder } from "typeorm-seeding";
import { User } from "@entities/user.entity";
import { Profile } from "@/src/entities/profile.entity";

export default class CreateUserSeed implements Seeder {
    public async run(factory: Factory): Promise<void> {
        await factory(User)()
            .map(async user => {
                const profile = await factory(Profile)().create();

                user.profile = profile;
                return user;
            })
            .createMany(10);
    }
}
