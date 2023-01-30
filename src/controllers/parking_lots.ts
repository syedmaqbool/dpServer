import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { myDataSource } from "../config/db.config"
import { User } from "../entity/user.entity"
import { Slots } from "../entity/slots.entity"
import { Parking_lots } from "../entity/parking_lots.entity"

// // getting a single Area slot
const getSlots = async (req: Request, res: Response, next: NextFunction) => {

    let id: number = Number(req.params.id);

    try {
        const slots = await myDataSource.getRepository(Slots).find({
            where: { parkingarea_id:id }
        })
        res.status(200).json({
            status:200,
            msg:'Record Found',
            data:slots
        })
    }
    catch (error) {
        return res.status(200).json({
            status: 300,
            msg: "Failed To Fetch Records",
        });
    }

};

const getParkingLots = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const Area = await myDataSource.getRepository(Parking_lots)
            .find()
        return res.status(200).json({
            status:Area.length==0?300:200,
            msg:Area.length==0 ?'No Record Found':'Record Found',
            data: Area
        });
    }
    catch (error) {
        return res.status(200).json({
            status: 300,
            msg: "Failed To Fetch Records",
        });
    }

};

export default { getSlots,getParkingLots};
