import { Request, Response } from "express";
import {AppDataSource} from '../data-source'
import {CustomerUser}from '../entity/customerUser'


export class CustomerUserController {
    // static createUser(arg0: string, createUser: any) {
    //     throw new Error("Method not implemented.");
    // }
    async getAllUser(req: Request, res: Response) {
        try {
            const customerUserRepo = AppDataSource.getRepository(CustomerUser);
            const customerUserList = await customerUserRepo.find();
            return res.status(200).json({ customerUserList });
        } catch (error) {
            return res.status(400).json({ message: error.message || "An error occurred" });
        }
    }

    async createUser(req: Request, res: Response){
         const {firstName, lastName, emailId, password, role} = req.body;
         if(!firstName || !lastName || !emailId || !password || !role){
            return res.status(400).send({message: 'Missing some Data'});
         }
         if(!['admin', 'staff'].includes(role.toLowerCase())){
            return res.status(400).send({message: 'Invalid Role'});
         }
         const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/;
        if (!password.match(pattern)) {
            const passwordValidatingMessage = [];
            passwordValidatingMessage.push('Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
            const errResponse: any = {
                status: 0,
                message: "You have an error in your request's body. Check 'errors' field for more details!",
                data: { message: passwordValidatingMessage },
            };
            return res.status(400).send(errResponse);
        }
         try {
            const checkUser = await AppDataSource.getRepository(CustomerUser).findOne({
                where:{
                    emailId: emailId.toLowerCase(),
                },
            });
            if(checkUser){
                return res.status(400).send({message: 'User Already Exist'});
            }
            const customer = new CustomerUser();
            customer.firstName = firstName;
            customer.lastName = lastName ? lastName : null;
            customer.emailId = emailId.toLowerCase();
            customer.password = password;
            customer.role = role.toLowerCase();
            const createUser:any = await AppDataSource.getRepository(CustomerUser).save(customer);
             return res.status(200).json(createUser);         
         } catch (error: any) {
            return res.status(400).json({message: error});
         }
    };
}