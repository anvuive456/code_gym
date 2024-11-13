import { FitnessPackage } from "@/src/entities/fitness_package.entity";
import { faker } from "@faker-js/faker";
import { define } from "typeorm-seeding";

define(FitnessPackage, () => {
    const data = new FitnessPackage();
    data.name = faker.commerce.productName();
    data.description = faker.commerce.productDescription();
    return data;
});
