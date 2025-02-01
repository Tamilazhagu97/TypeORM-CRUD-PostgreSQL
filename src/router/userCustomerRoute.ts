import { Router } from "express";
import { CustomerUserController } from "../controller/customerUserController";

const userCustomerRouter = Router();
const customerUserController = new CustomerUserController();
userCustomerRouter.get("/customer-user", customerUserController.getAllUser.bind(customerUserController));

export default userCustomerRouter;
