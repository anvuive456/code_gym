import { Role } from "@entities/role.entity";
import { define } from "typeorm-seeding";
import { User } from "@entities/user.entity";
import { Faker } from "@faker-js/faker";

import * as bcrypt from "bcrypt";

define(User, (faker: typeof Faker) => {
    

    const user = new User();
    user.username = "user_" + Math.random().toString(36).substring(7);
    user.password = bcrypt.hashSync("password123", 10); // Mật khẩu cố định để dễ login thử nghiệm
    user.role = Role.user; // Chọn role mặc định là user, có thể chỉnh sửa nếu cần
    return user;
});
