import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm"
import bcrypt = require('bcrypt');

@Entity('tbl_customer_user')
export class CustomerUser {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'first_name'})
    firstName: string

    @Column({name: 'last_name'})
    lastName: string

    @Column({name: 'email_id'})
    emailId: string
    
    @Column({name: 'password'})
    password: string

    @Column({name: 'role'})
    role: string
     
    @BeforeInsert()
     async hashPassword() {
        this.password =  await bcrypt.hash(this.password,10,)
    }

    async comparePassword (plainPassword: string):Promise<boolean>{
        return await bcrypt.compare(plainPassword, this.password);
    }
}
