import { ResponseStatus } from "../../core/utils/constants";
import controllerHandler from "../../core/utils/controllerHandler";
import { TAddProductToCartParams, TAddProductToCartPayload } from "./schema";
import { addProductToCart } from "./service";
import { TIncProductQuantityParams, TIncProductQuantityPayload } from "./schema"

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

    static incProductQtyInCart = controllerHandler<TIncProductQuantityParams,{},TIncProductQuantityPayload>(
        async (req,res,next) => {
            
        }
    )
}