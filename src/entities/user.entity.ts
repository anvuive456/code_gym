import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Profile } from "@entities/profile.entity";
import { Role } from "@entities/role.entity";
import { Branch } from "@entities/branch.entity";
import bcrypt from "bcrypt";
import { FitnessPackage } from "./fitness_package.entity";

@Entity({ engine: "InnoDB", name: "users" })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "username" })
    username: string;

    @Column({ name: "password" })
    password: string;

    @Column({ nullable: true, type: "datetime" })
    deletedAt: Date | null;

    @CreateDateColumn()
    createdAt: Date;

    // @Column({
    //     type: "simple-enum",
    //     enum: Role,
    //     default: Role.user,
    // })
    @Column({
        type: "simple-enum",
        enum: Role,
        default: Role.user, // Đặt giá trị mặc định nếu cần
    })
    role: Role;
    @OneToOne(() => Profile, profile => profile.user, { onDelete: "CASCADE" })
    @JoinColumn()
    profile: Profile;

    @ManyToOne(() => Branch, branch => branch.users)
    branch: Branch; 
    
    @OneToOne(() => FitnessPackage, fitnessPackage => fitnessPackage.name, { onDelete: "CASCADE" })
    @JoinColumn()
    fitnessPackage: FitnessPackage; 

    @BeforeInsert()
    updatePassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}
