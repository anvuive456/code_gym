import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { User } from "@entities/user.entity";
import { FitnessPackage } from "@entities/fitness_package.entity";
import { Promotion } from "@entities/promotion.entity";

@Entity()
export class Branch {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    lat: number;

    @Column()
    lng: number;

    @OneToMany(() => User, user => user.branch)
    users: User[];

    @ManyToMany(() => FitnessPackage, fitnesspackage => fitnesspackage.branches)
    @JoinTable()
    fitnesspackages: FitnessPackage[];

    @ManyToMany(() => Promotion, promotion => promotion.branches)
    promotions: Promotion[];
}
