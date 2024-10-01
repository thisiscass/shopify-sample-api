import { Model } from "sequelize-typescript";
import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasOne, PrimaryKey, Table } from "sequelize-typescript";
import { Product } from "./product";
import { Order } from "./order";

@Table({
    tableName: 'LineItems',
    timestamps: false
})
export class LineItem extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => Order)
    @Column
    orderId!: number;

    @BelongsTo(() => Order)
    order!: Order;

    @ForeignKey(() => Product)
    @Column
    productId?: number;

    @BelongsTo(() => Product)
    product?: Product;

    @Column(DataType.INTEGER)
    platform_id!: number;
}