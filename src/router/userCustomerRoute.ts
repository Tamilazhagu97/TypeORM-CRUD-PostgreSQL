import { Router } from "express";
import { CustomerUserController } from "../controller/customerUserController";
import { CustomerUser } from "../entity/customerUser";

const userCustomerRouter = Router();
const customerUserController = new CustomerUserController();
userCustomerRouter.get("/customer-user", customerUserController.getAllUser.bind(customerUserController));
userCustomerRouter.post('/customer-user', customerUserController.createUser.bind(CustomerUser))

export default userCustomerRouter;
