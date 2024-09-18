import { ResponseStatus } from "../../core/utils/constants";
import controllerHandler from "../../core/utils/controllerHandler";
import { TCreateCategoryPayload, TDeleteCategoryParams, TGetAllCategoriesQuery, TUpdateCategoryParams } from "./schema";
import { createCategory, deleteCategoryById, getAllCategories, updateCategoryById } from "./service";

export class CategoriesController {
    static getCategories = controllerHandler<TGetAllCategoriesQuery>(
        async (req,res,next) => {
            const { search = '', page = '1', limit = '10' } = req.query || {}
            const parsedPages = parseInt(page)
            const parsedLimit = parseInt(limit) 

            const categoriesRes = await getAllCategories(search,parsedPages,parsedLimit) 

            return res.status(200).json({
                data:categoriesRes,
                error:null,
                status:ResponseStatus.SUCCESS,
                message:"got all categories successfully"
            })
        }
    )

    static createCategory = controllerHandler<{},{},TCreateCategoryPayload>(
        async (req,res,next) => {
            const body = req.body
            
            const category = await createCategory(body)

            return res.status(201).json({
                data:category,
                error:null,
                status:ResponseStatus.SUCCESS,
                message:"category created successfully"
            })
        }
    )

    static updateCategoryById = controllerHandler<TUpdateCategoryParams,{},TCreateCategoryPayload>(
        async (req,res,next) => {
            const body = req.body
            const categoryId = req.params.id

            const updatedCategory = await updateCategoryById(categoryId,body)

            res.status(200).json({
                data:updatedCategory,
                error:null,
                status:ResponseStatus.SUCCESS,
                message:'category updated successully'
            })
        }
    )

    static deleteCategoryById = controllerHandler<TDeleteCategoryParams>(
        async (req,res,next) => {
            const categoryId = req.params.id

            const deletedCategory = await deleteCategoryById(categoryId)

            return res.status(200).json({
                data:deletedCategory,
                status:ResponseStatus.SUCCESS,
                error:null,
                message:"category deleted successfully"
            })
        }
    )
}