import { Model } from "sequelize-typescript";
import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasOne, PrimaryKey, Table } from "sequelize-typescript";
import { Product } from "./product";

@Table({
    tableName: 'LineItems',
    timestamps: false
})
export class LineItem extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => Product)
    @Column
    productId?: number;

    @BelongsTo(() => Product)
    product?: Product;

    @Column(DataType.INTEGER)
    platform_id!: number;
}