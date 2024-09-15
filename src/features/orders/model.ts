import { NextFunction } from "express";
import { Document ,Schema ,model, ObjectId, Types } from "mongoose";


export interface IOrderIndex {
    index:number
}

const orderIndexSchema = new Schema<IOrderIndex>({
    index:{
        required:true,
        type:Number
    }
})

export const OrderIndexModel = model("OrderIndex",orderIndexSchema)


export interface IOrder extends Document {
    total:          number,
    date:           string,
    isDelivered:    boolean,
    products:       ObjectId[],
    user:           ObjectId,
    name:           string,
    address:        string,
    city:           string,
    country:        string,
    payment:        string // may be enums later
}

const orderSchema = new Schema<IOrder>({
    total:{
        required:true,
        type:Number
    },
    date:{
        required:true,
        type:String
    },
    isDelivered:{
        type:Boolean,
        default:false
    },
    products:{
        required:true,
        type:[{
            product:{
                type:[Schema.Types.ObjectId],
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,        
                required:true
            }
        }]
    },
    user:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        required:true,
        type:String
    },
    address:{
        required:true,
        type:String
    },
    city:{
        required:true,
        type:String
    },
    country:{
        required:true,
        type:String
    },
    payment:{
        required:true,
        type:String
    }
})

export const OrderModel = model("Order",orderSchema)

