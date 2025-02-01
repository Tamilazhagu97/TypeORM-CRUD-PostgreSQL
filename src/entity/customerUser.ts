import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}
