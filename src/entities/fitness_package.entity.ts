import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    BaseEntity,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { Promotion } from "@entities/promotion.entity";
import { Branch } from "@entities/branch.entity";
import { User } from "@entities/user.entity";

@Entity({ name: "packages" })
export class FitnessPackage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: true, type: "datetime" })
    deletedAt: Date | null;

    @ManyToMany(() => Promotion, promotion => promotion.packages)
    @JoinTable()
    promotions: Promotion[];

    // Quan hệ với user
    @OneToMany(() => User, e => e.fitnessPackage)
    user: User[];
    @ManyToMany(() => Branch, branch => branch.fitnesspackages)
    branches: Branch[];
}
