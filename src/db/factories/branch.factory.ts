import { Branch } from "@/src/entities/branch.entity";
import { FitnessPackage } from "@/src/entities/fitness_package.entity";
import { faker } from "@faker-js/faker";
import { define } from "typeorm-seeding";

define(Branch, () => {
    const data = new Branch();
    data.name = faker.company.name();
    data.address = faker.location.streetAddress();
    data.lat = faker.location.latitude();
    data.lng = faker.location.longitude();

    return data;
});
