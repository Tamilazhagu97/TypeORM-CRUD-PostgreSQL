import "reflect-metadata"
import { DataSource } from "typeorm"
import { CustomerUser } from "./entity/customerUser"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "postgres",
    synchronize: false,
    logging: true,
    entities: [CustomerUser],
    migrations: [],
    subscribers: [],
});
