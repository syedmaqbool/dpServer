import { Request, Response, NextFunction } from 'express';
import { myDataSource } from "../config/db.config"
import { Bookings } from "../entity/bookings.entity"
import { Slots } from "../entity/slots.entity"


// adding a slot
const addSlot = async (req: Request, res: Response, next: NextFunction) => {

    // get the data from req.body
    let p_id: number = req.body.lot_id;
    let slot_id: number = req.body.slot_id;
    let user_id: number = req.body.user_id;
    let timeIn: Date = req.body.timeIn;
    let timeOut: Date = req.body.timeOut;
    let bookingDate: Date = req.body.bookingDate;
    let status = 1;

    try{
        const slotRepo = await myDataSource.getRepository(Bookings);
        const slot = slotRepo.create({
            p_id,
            slot_id,
            user_id,
            timeIn,
            timeOut,
            bookingDate,
            status
        });
        await slotRepo.save(slot)
            .catch((err) => {
                console.log("Error: ", err);
                return res.status(200).json({
                    status:'300',
                    msg:'Error',
                    data: err
                });
            });
        if(slot.id != undefined){
            const SlotUpdate  = await myDataSource
                .createQueryBuilder()
                .update(Slots)
                .set({
                    status: 1,
                })
                .where("parkingarea_id = :p_id and id = :slot_id", { p_id,slot_id })
                .execute()
         }
        return res.status(200).json({
            status:'200',
            msg:'Record Updated',
            data: slot
        });


    }
    catch (error) {
        return res.status(200).json({
            status: 300,
            msg: "Failed To Fetch Records",
        });
    }


};

const getAllBookings = async (request: Request,response: Response,next: NextFunction) => {
    try {
        const slotRepository = await myDataSource.getRepository(Bookings);
        const bookings = await slotRepository.find();
        return response.status(200).json({
            status: 200,
            msg: "Records Found",
            data: bookings,
        });
    } catch (error) {
        return response.status(200).json({
            status: 300,
            msg: "Failed To Fetch Records",
        });
    }
};

export default { addSlot,getAllBookings };
