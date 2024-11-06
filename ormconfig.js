module.exports = {
    seeds: ["src/db/seeds/*{.ts,.js}"],
    factories: ["src/db/factories/*{.ts,.js}"],
    entities: ["src/entities/*{.entity.ts,.entity.js}"],//
    type: "mysql", // Chỉ định loại cơ sở dữ liệu là MySQL
    host: "127.0.0.1", // Địa chỉ của server MySQL
    port: 3306, // Cổng mặc định của MySQL
    username: "root", // Tên người dùng MySQL
    password: "", // Mật khẩu MySQL
    database: "codegym", // Tên cơ sở dữ liệu
};
