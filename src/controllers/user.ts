import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { myDataSource } from "../config/db.config"
import { User } from "../entity/user.entity"
import jwt, {Secret} from 'jsonwebtoken';
export const SECRET_KEY: Secret = 'Digitplt';
interface UserData {
    id: Number;
    name: String;
    email: String;
    pwd: String;
    status: Number;
}

// getting all Users
const getUsers = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const users = await myDataSource.getRepository(User).find()
        return res.status(200).json({
            status: 200,
            msg: "Records Found",
            message: users
        });
    }
    catch (error) {
        return res.status(200).json({
            status: 300,
            msg: "Failed To Fetch Records",
        });
    }

};

// // getting a single user
const getUser = async (req: Request, res: Response, next: NextFunction) => {

    let email: string = req.body.email;
    let password: string = req.body.pwd;

    try {
        const user:any = await myDataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .where("email = :email AND pwd = :password", {email,password})
            .getOne()
        const token = jwt.sign(
            {id: user.id},
            SECRET_KEY,
        );
        const {pwd,...otherDetails} = user;
        return  res.cookie(
            "access_token",token,{
                httpOnly:true,
            }
        ).status(200).json({
            status:200,
            msg:'Record Found',
            data: {...otherDetails},
        });
    }
    catch (error) {
        return res.status(200).json({
            status: 300,
            msg: "Failed To Fetch Records",
        });
    }



};

export default { getUsers, getUser};
