import express from 'express';
import userController from '../controllers/user';
import lotsController from '../controllers/parking_lots';
import slotController from '../controllers/slots';
import bookingController from '../controllers/bookings';
const router = express.Router();
import {verifyToken} from "../utils/verifyToken";
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

router.get('/users', userController.getUsers);
router.post('/user/login', userController.getUser);
router.get('/user/slots/:id', slotController.getBookedSlots);
router.get('/area/:id', lotsController.getSlots);
router.get('/areas', lotsController.getParkingLots);
router.post('/slot/book', bookingController.addSlot);
router.get("/bookings", bookingController.getAllBookings);
router.get("/bookings/:id", slotController.getBookedSlots);

//Jwt authorized endpoints
router.get('/auth/users', verifyToken,userController.getUsers);
router.get('/auth/user/slots/:id',verifyToken, slotController.getBookedSlots);
router.get('/auth/area/:id',verifyToken, lotsController.getSlots);
router.get('/auth/areas',verifyToken, lotsController.getParkingLots);
router.post('/auth/slot/book', verifyToken,bookingController.addSlot);
router.get("/auth/bookings", verifyToken,bookingController.getAllBookings);
router.get("/auth/bookings/:id", verifyToken,slotController.getBookedSlots);



router.use((err:any,req: Request, res: Response, next: NextFunction)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    });
})
export = router;
