import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Promotion } from "@entities/promotion.entity";
import { Branch } from "@entities/branch.entity";

@Entity()
export class GymType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => Promotion,promotion => promotion.gymTypes)
    @JoinTable()
    promotions: Promotion[];

    @ManyToMany(() => Branch, branch => branch.gymTypes)
    branches: Branch[];
}
