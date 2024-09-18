import { Document ,Schema ,model, ObjectId, Types } from "mongoose";


export interface IProduct extends Document {
    name:           string,
    description:    string,
    price:          number,
    images:         string[],
    variants:       {name:string,values:string[]}[],
    amount:         number,
    discount:       number,
    category:       ObjectId
}


const productSchema = new Schema<IProduct>({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    images:{
        type:[String],
        required:false
    },
    variants:{
        type:[{
            name:{
                type:String,
                required:true
            },
            values:{
                type:[String],
                required:true
            }
        }],
        required:false
    },
    discount:{
        required:false,
        default:0,
        type:Number
    },
    category:{
        type:Types.ObjectId||null,
        required:true
    }
})

export const ProductModel = model<IProduct>("Product",productSchema)