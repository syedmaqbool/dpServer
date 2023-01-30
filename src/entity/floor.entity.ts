import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Floor {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    building_id: number

    @Column()
    status: number


}
