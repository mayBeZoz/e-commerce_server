import { CategoriesModel, ICategory } from "./model"
import { TCreateCategoryPayload, TUpdateCategoryPayload } from "./schema";

export const getAllCategories = async (search:string,page:number,limit:number):Promise<{
    products:Partial<ICategory>[],
    total_pages:number,
    curr_page:number
}> => {
    const regexQuery = new RegExp(search, "i")
    const skip = (page - 1) * limit;

    const queryObj = {
        $or: [
            { name: { $regex: regexQuery } },
        ],
    }

    const totalProducts = await CategoriesModel.countDocuments(queryObj);
    const totalPages = Math.ceil(totalProducts / limit)

    const products = await CategoriesModel
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


export const createCategory = async (payload:TCreateCategoryPayload) => CategoriesModel.create(payload)

export const updateCategoryById = async (categoryId:string,payload:TUpdateCategoryPayload) => CategoriesModel.findOneAndUpdate(
    {_id:categoryId},
    {$set:payload},
    {new:true}
)

export const deleteCategoryById = async (categoryId:string) => CategoriesModel.findByIdAndDelete(categoryId)