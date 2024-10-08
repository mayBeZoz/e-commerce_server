import { ObjectId } from "mongoose";
import { IProduct, ProductModel } from "./model";
import { TCreateProductSchemaPayload, TUpdateProductSchemaPayload } from "./shcema";

export const createProduct = (payload:TCreateProductSchemaPayload) => {
    return ProductModel.create(payload)
}


export const findProductById = (id:String) => {
    return ProductModel.findById(id)

}


export const updateProductById = (id:string,payload:TUpdateProductSchemaPayload) => {
    return ProductModel.findOneAndUpdate(
        {_id:id},
        {$set:payload},
        {new:true}
    )

}


export const deleteProductById = (id:string) => {
    return ProductModel.findByIdAndDelete(id)
}

export const findManyProductsByIds = (ids:string[]) => {
    return ProductModel.find({
        _id: { $in: ids }
    })
}

export const getProducts = async (search:string,page:number,limit:number):Promise<{
    products:Partial<IProduct>[],
    total_pages:number,
    curr_page:number
}> => {
    const regexQuery = new RegExp(search, "i")
    const skip = (page - 1) * limit;

    const queryObj = {
        $or: [
            { name: { $regex: regexQuery } },
            { description: { $regex: regexQuery } },
        ],
    }

    const totalProducts = await ProductModel.countDocuments(queryObj);
    const totalPages = Math.ceil(totalProducts / limit)

    const products = await ProductModel
    .find(queryObj)
    .sort({ createdAt: -1 }) 
    .skip(skip)
    .limit(limit)

    return {
        products,
        total_pages:totalPages,
        curr_page:page
    }
}