import { Document, model, Schema } from "mongoose";

export interface ICategory extends Document {
    name:string,
}

const categorySchema = new Schema<ICategory>({
    name:{
        required:true,
        type:String
    }
})


export const CategoriesModel = model("Category",categorySchema)
