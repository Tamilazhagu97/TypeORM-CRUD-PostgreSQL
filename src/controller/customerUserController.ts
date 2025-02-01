import { Request, Response } from "express";
import {AppDataSource} from '../data-source'
import {CustomerUser}from '../entity/customerUser'


export class CustomerUserController {
    async getAllUser(req: Request, res: Response) {
        try {
            const customerUserRepo = AppDataSource.getRepository(CustomerUser);
            const customerUserList = await customerUserRepo.find();
            console.log(customerUserList, 'WWE')
            return res.status(200).json({ customerUserList });
        } catch (error) {
            return res.status(400).json({ message: error.message || "An error occurred" });
        }
    }
}