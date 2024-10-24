import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ engine: "InnoDB", name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "username" })
    username: string;

    @Column({ name: "password" })
    password: string;

    @Column({ default: false })
    role: "user" | "admin" | "manager";
}
