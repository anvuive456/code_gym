import { Role } from "@entities/role.entity";
import { define } from "typeorm-seeding";
import { User } from "@entities/user.entity";
import { faker } from "@faker-js/faker";

import bcrypt from "bcrypt";

define(User, () => {
    const user = new User();
    user.username = faker.internet.username();
    user.password = "password123"; // Mật khẩu cố định để dễ login thử nghiệm
    user.role = faker.helpers.enumValue(Role); // Chọn role mặc định là user, có thể chỉnh sửa nếu cần
    return user;
});
