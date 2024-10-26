import { DataSource } from "typeorm";
import { User } from "@entities/user.entity";
import { Role } from "@entities/role.entity";
import { Branch } from "@entities/branch.entity";
import { GymType } from "@entities/gym_type.entity";
import { Profile } from "@entities/profile.entity";
import { Promotion } from "@entities/promotion.entity";

const MysqlDataSource = () => {
    return new DataSource({
        type: "mysql",
        host: "127.0.0.1",
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User, Role, Branch, GymType, Profile, Promotion],
        logging: false,
        synchronize: true,
    });
};

export default MysqlDataSource;
