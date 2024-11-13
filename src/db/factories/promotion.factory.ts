import { Promotion } from "@/src/entities/promotion.entity";
import { faker } from "@faker-js/faker/locale/vi";
import { define } from "typeorm-seeding";

define(Promotion, () => {
    const data = new Promotion();
    data.name = faker.commerce.productName();
    data.description = faker.lorem.sentences(2);
    data.discountPercentage = faker.number.int({ min: 5, max: 50 });
    data.startDate = faker.date.future({ refDate: 0.5 }); // Ngày bắt đầu trong tương lai gần
    data.endDate = faker.date.future({ refDate: 1 }); // Ngày kết thúc xa hơn một chút

    return data;
});
