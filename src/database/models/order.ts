import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { LineItem } from './line-item';

@Table({
    tableName: 'Orders',
    timestamps: false,
})
export class Order extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.TEXT)
    platformId!: string;

    @HasMany(() => LineItem)
    lineItems!: LineItem[];

}