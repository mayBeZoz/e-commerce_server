import { ResponseStatus } from "../../core/utils/constants";
import controllerHandler from "../../core/utils/controllerHandler";
import { TAddProductToCartParams, TAddProductToCartPayload, TChangeProductQuantityParams, TChangeProductQuantityPayload, TGetUserCartParams, TGetUserCartQuery, TRemoveProductFromCartParams, TRemoveProductFromCartPayload } from "./schema";
import { addProductToCart, changeCartProductQty, getUserCart, removeProductFromCart } from "./service";

export class CartsController {
    static addProductToCart = controllerHandler<TAddProductToCartParams,{},TAddProductToCartPayload>(
        async (req,res,next) => {
            const userId = req.params.userId
            const body = req.body

            const userCart = await addProductToCart(userId,body.productId)

            return res.status(201).json({
                data:userCart,
                status:ResponseStatus.SUCCESS,
                message:"product is added to cart successfully",
                error:null
            })
        }
    )

    static changeProductQty = controllerHandler<TChangeProductQuantityParams,{},TChangeProductQuantityPayload>(
        async (req,res,next) => {
            const {productId,quantity} = req.body

            const userId = req.params.userId
            const updatedCart = await changeCartProductQty(userId,productId,+Math.trunc(quantity))

            return res.status(200).json({
                data:updatedCart,
                message:'product quantity changed successfully',
                status:ResponseStatus.SUCCESS,
                error:null
            })
        }
    )

    static removeProductFromCart = controllerHandler<TRemoveProductFromCartParams,{},TRemoveProductFromCartPayload>(
        async (req,res,next) => {
            const {productId} = req.body

            const userId = req.params.userId
            const updatedCart = await removeProductFromCart(userId,productId)

            return res.status(200).json({
                data:updatedCart,
                message:'product removed from cart successfully',
                status:ResponseStatus.SUCCESS,
                error:null
            })
        }
    )

    static getUserCart = controllerHandler<TGetUserCartParams,{},{},TGetUserCartQuery>(
        async (req,res,next) => {
            const userId = req.params.userId
            const { page = '1', limit = '10' } = req.query || {}
            const parsedPages = parseInt(page)
            const parsedLimit = parseInt(limit)
            const cart = await getUserCart(parsedPages,parsedLimit,userId)

            if (cart) {
                return res.status(200).json({
                    data:cart,
                    message:'got the cart successfully',
                    status:ResponseStatus.SUCCESS,
                    error:null
                })
            }else {
                return res.status(404).json({
                    data:null,
                    message:'this user has no cart',
                    status:ResponseStatus.FAILED,
                    error:null
                })
            }
        }
    )
}