import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { GymType } from "@entities/gym_type.entity";
import { Branch } from "@entities/branch.entity";


@Entity()
export class Promotion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column()
    discountPercentage: number;

    @Column('date')
    startDate: Date;

    @Column('date')
    endDate: Date;

    // Quan hệ với chi nhánh
    @ManyToMany(() => Branch, branch => branch.promotions)
    @JoinTable()
    branches: Branch[];

    // Quan hệ với loại phòng tập
    @ManyToMany(() => GymType, gymType => gymType.promotions)
    @JoinTable()
    gymTypes: GymType[];
}
