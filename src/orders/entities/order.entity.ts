/* eslint-disable prettier/prettier */
import { Farm } from "../../farms/entities";
import { OrderStatement } from "../../order-statements/entities";
import { Truck } from "../../trucks/entities";
import { TypeOrder } from "../../type-orders/entities";
import { User } from "../../users/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn('increment')
    idOrder: number;

    @ManyToOne(()=> Farm, farm=> farm.firstFarmOrder, {cascade:true,eager:true})
    @JoinColumn({name:'first_farm'})
    firstFarm: Farm;

    @ManyToOne(()=> Farm, farm => farm.lastFarmOrder, {cascade:true,eager:true})
    @JoinColumn({name:'last_farm'})
    lastFarm: Farm;

    @Column({ type: 'timestamp'})
    startDate: Date;

    @Column({ type: 'varchar'})
    description: string;

    @Column({ type: 'timestamp', nullable:true})
    arriveDate: Date;

    @Column({ type: 'timestamp', nullable:true})
    exitDate:Date;

    @Column({ type: 'timestamp', nullable:true})
    destinationArriveDate: Date;

    @Column({ type: 'timestamp', nullable:true})
    finishDate: Date;

    @ManyToOne(()=> OrderStatement, orderStatement=> orderStatement.order,{cascade: true,eager:true})
    @JoinColumn({name:'order_statement'})
    statement:OrderStatement;

    @ManyToOne(()=> User, user=> user.order, {cascade: true, eager:true})
    @JoinColumn({name:'user'})
    requestUser:User;

    @ManyToOne(()=> Truck, truck=> truck.order, {cascade:true,eager:true})
    @JoinColumn({name:'truck'})
    truck:Truck;

    @ManyToOne(()=> TypeOrder, typeOrder=> typeOrder, { cascade:true,eager:true})
    typeOrder: TypeOrder;

    @Column({ type: 'bool', nullable:true, default: false})
    isBill: boolean;

}
