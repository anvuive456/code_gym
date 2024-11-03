import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Promotion } from "@entities/promotion.entity";
import { Branch } from "@entities/branch.entity";

@Entity({ name: "packages" })
export class FitnessPackage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => Promotion, promotion => promotion.fitnesspackages)
    @JoinTable()
    promotions: Promotion[];

    @ManyToMany(() => Branch, branch => branch.fitnesspackages)
    branches: Branch[];
}
