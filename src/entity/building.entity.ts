import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Building {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    address: string

    @Column()
    location: string

    @Column()
    city: string

    @Column()
    status: number




}
