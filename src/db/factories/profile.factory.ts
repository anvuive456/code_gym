import { Profile } from "@/src/entities/profile.entity";
import { Role } from "@/src/entities/role.entity";
import { faker } from "@faker-js/faker/locale/vi";
import { define } from "typeorm-seeding";

define(Profile, () => {
    const user = new Profile();
    user.name = faker.internet.displayName();
    user.email = faker.internet.email();
    user.gender = faker.helpers.enumValue(Role);
    user.phone = faker.phone.number();
    user.photo = faker.image.avatar();
    return user;
});
