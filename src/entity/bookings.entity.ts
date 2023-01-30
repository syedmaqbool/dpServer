import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Bookings {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    slot_id: number

    @Column()
    p_id: number

    @Column({ type: 'datetime' })
    bookingDate: Date

    @Column('time', {name: 'timeIn'})
    timeIn: Date

    @Column('time', {name: 'timeOut'})
    timeOut: Date

    @Column()
    status: number

    @Column({ type: 'datetime' })
    createdOn: Date


}
