import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { User } from "@entities/user.entity";
import { GymType } from "@entities/gym_type.entity";
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

    @ManyToMany(() => GymType, gymType => gymType.branches)
    @JoinTable()
    gymTypes: GymType[];

    @ManyToMany(() => Promotion, promotion => promotion.branches)
    promotions: Promotion[];
}
