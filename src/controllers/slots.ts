import { Request, Response, NextFunction } from 'express';
import { myDataSource } from "../config/db.config"
import { User } from "../entity/user.entity"
import { Bookings } from "../entity/bookings.entity"
import {Slots} from "../entity/slots.entity";

// // getting a single Area slot
const getSlots = async (req: Request, res: Response, next: NextFunction) => {

    let id: string = req.params.id;

    try{
        const user = await myDataSource
            .getRepository(User)
            .createQueryBuilder("slots")
            .where("parkingarea_id = :id", {id})
            .getOne()

        return res.status(200).json({
            status:user == null?300:200,
            msg:user == null?'No Record Found':'Record Found',
            data: user == null?'':user,
        });
    }
    catch (error) {
        return res.status(200).json({
            status: 300,
            msg: "Failed To Fetch Records",
        });
    }

};

const getBookedSlots = async (req: Request, res: Response, next: NextFunction) => {

    let id: number = Number(req.params.id);

    try{
        const bookedSlots = await myDataSource
            .getRepository(Bookings)
            .find({
                where: { user_id:id }
            })

        res.status(200).json({
            status:'200',
            msg:'Record Updated',
            data: bookedSlots
        });
    }
    catch (error) {
        return res.status(200).json({
            status: 300,
            msg: "Failed To Fetch Records",
        });
    }

};



export default { getSlots,getBookedSlots};
