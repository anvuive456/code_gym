import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    BaseEntity,
} from "typeorm";
import { Promotion } from "@entities/promotion.entity";
import { Branch } from "@entities/branch.entity";

@Entity({ name: "packages" })
export class FitnessPackage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ nullable: true, type: "datetime" })
    deletedAt?: Date;

    @ManyToMany(() => Promotion, promotion => promotion.fitnesspackages)
    @JoinTable()
    promotions: Promotion[];

    @ManyToMany(() => Branch, branch => branch.fitnesspackages)
    branches: Branch[];
}
