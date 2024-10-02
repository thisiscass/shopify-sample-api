import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Sequelize, Table } from 'sequelize-typescript';
import { LineItem } from './line-item';

@Table({
    tableName: 'Products',
    timestamps: false,
})
export class Product extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;
    
    @Column(DataType.TEXT)
    name!: string;

    @Column(DataType.TEXT)
    platformId!: string;

    @HasMany(() => LineItem)
    LineItems?: LineItem[];
}