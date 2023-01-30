import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Slots {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    slot_location: string

    @Column()
    status: number

    @Column()
    parkingarea_id: number


}
