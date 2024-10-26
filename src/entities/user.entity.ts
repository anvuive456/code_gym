import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "@entities/profile.entity";
import { Role } from "@entities/role.entity";
import { Branch } from "@entities/branch.entity";

@Entity({ engine: "InnoDB", name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "username" })
    username: string;

    @Column({ name: "password" })
    password: string;

    @ManyToOne(() => Role, role => role.users)
    @JoinColumn()
    role: Role;

    @OneToOne(() => Profile, profile => profile.user, { onDelete: "CASCADE" })
    @JoinColumn()
    profile: Profile;

    @ManyToOne(() => Branch, branch => branch.users)
    branch: Branch;

}
