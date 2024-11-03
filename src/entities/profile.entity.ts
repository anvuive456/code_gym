import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from "@entities/user.entity";

@Entity({ name: "profiles" })
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    gender: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    photo: string;

    @OneToOne(() => User, (user) => user.profile)
    user: User;
}
