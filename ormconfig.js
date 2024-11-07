module.exports = {
    seeds: ["src/db/seeds/**/*.seeding.{ts,js}"],
    factories: ["src/db/factories/**/*.factory.{ts,js}"],
    entities: ["src/entities/**/*.entity.{ts,js}"],//
    type: "mysql", // Chỉ định loại cơ sở dữ liệu là MySQL
    host: "127.0.0.1", // Địa chỉ của server MySQL
    port: 3306, // Cổng mặc định của MySQL
    username: "root", // Tên người dùng MySQL
    password: "1234", // Mật khẩu MySQL
    database: "codegym", // Tên cơ sở dữ liệu
};
