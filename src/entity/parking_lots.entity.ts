import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Parking_lots {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    area_location: string

    @Column()
    floor_id: number

    @Column()
    status: number
}
