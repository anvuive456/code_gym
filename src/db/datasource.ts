import { DataSource } from "typeorm";
import { User } from "@entities/user.entity";

const MysqlDataSource = () => {
    return new DataSource({
        type: "mysql",
        host: "127.0.0.1",
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User],
        logging: false,
        synchronize: true,
    });
};

export default MysqlDataSource;
