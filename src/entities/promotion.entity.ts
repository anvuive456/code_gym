import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    BaseEntity,
    CreateDateColumn,
} from "typeorm";
import { FitnessPackage } from "@entities/fitness_package.entity";
import { Branch } from "@entities/branch.entity";

@Entity({ name: "promotions" })
export class Promotion extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("text")
    description: string;

    @Column()
    discountPercentage: number;

    @Column("date")
    startDate: Date;

    @Column("date")
    endDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: true, type: "datetime" })
    deletedAt: Date | null;

    // Quan hệ với chi nhánh
    @ManyToMany(() => Branch, branch => branch.promotions)
    @JoinTable()
    branches: Branch[];

    // Quan hệ với gói tập
    @ManyToMany(
        () => FitnessPackage,
        fitnesspackage => fitnesspackage.promotions,
    )
    @JoinTable()
    packages: FitnessPackage[];
}
