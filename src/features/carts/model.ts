import { Document ,Schema ,model, ObjectId, Types } from "mongoose";


interface ICart extends Document {
    total:          number,
    products:{
        productId:  ObjectId,
        quantity:   number
    }[],
    user:           ObjectId,
}


const cartSchema = new Schema<ICart>({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:{
        required:true,
        type:[{
            productId:{
                ref:"Product",
                type:Schema.Types.ObjectId,
                required:true,
            },
            quantity:{
                required:true,
                type:Number
            }
        }]
    },
    total:{
        type:Number,
        required:true
    }
})


export const CartModel = model("Cart",cartSchema)


