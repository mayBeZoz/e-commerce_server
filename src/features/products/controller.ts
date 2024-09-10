import { ResponseStatus } from "../../core/utils/constants";
import controllerHandler from "../../core/utils/controllerHandler";
import { createProduct, deleteProductById, findProductById, getProducts, updateProductById } from "./service";
import { TCreateProductSchemaPayload, TDeleteProductSchemaParams, TGetAllProductSchema, TGetProductSchemaParams, TUpdateProductSchemaParams, TUpdateProductSchemaPayload } from "./shcema";

export class ProductController {
    static createProduct = controllerHandler<{},{},TCreateProductSchemaPayload>(
        async (req,res,next) => {
            const body = req.body
            const product = await createProduct(body)
            return res.status(201).json({
                status:ResponseStatus.SUCCESS,
                data:product,
                message:"product created successfully",
                error:null
            })
        }
    )

    static updateProductById = controllerHandler<TUpdateProductSchemaParams,{},TUpdateProductSchemaPayload>(
        async (req,res,next) => {
            const productId = req.params.id
            const body = req.body
            const product = await findProductById(productId)
            if (!product) {
                return res.status(404).json({
                    data:null,
                    error:null,
                    status:ResponseStatus.FAILED,
                    message:'product with this id is not found'
                })
            }

            const updatedProduct = await updateProductById(productId,body)

            return res.status(200).json({
                data:updatedProduct,
                error:null,
                status:ResponseStatus.SUCCESS,
                message:"product updated successfully"
            })
        }
    )

    static deleteProductById = controllerHandler<TDeleteProductSchemaParams>(
        async (req,res,next) => {
            const id = req.params.id
            const deletedProduct = await deleteProductById(id)

            return res.status(200).json({
                data:deletedProduct,
                message:"product deleted successfully",
                error:null,
                status:ResponseStatus.SUCCESS
            })
        }
    )

    static getAllProducts = controllerHandler<{},{},{},TGetAllProductSchema>(
        async (req,res,next) => {
            const { search = '', page = '1', limit = '10' } = req.query || {}
            const parsedPages = parseInt(page)
            const parsedLimit = parseInt(limit) 
            const productsRes = await getProducts(search,parsedPages,parsedLimit)
            
            return res.status(200).json({
                data:productsRes,
                status:ResponseStatus.SUCCESS,
                error:null,
                message:'got products successfully'
            })
        }
    )

    static getProductById = controllerHandler<TGetProductSchemaParams>(
        async (req,res,next) => {
            const productId = req.params.id
            const product = await findProductById(productId)

            if (product) {
                return res.status(200).json({
                    data:product,
                    error:null,
                    message:"got the product successfully",
                    status:ResponseStatus.SUCCESS
                })
            }
            return res.status(404).json({
                data:null,
                error:null,
                message:"product not found",
                status:ResponseStatus.FAILED
            })
            
        }
    )




}