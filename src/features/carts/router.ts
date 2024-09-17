import express from 'express';
import validateRequest from "../../core/middlewares/validateRequest";
import { CartsController } from './controller';
import { addProductToCartSchema, changeProductQuantitySchema, getUserCartSchema, removeProductFromCartSchema } from './schema';

const router = express.Router()


router.post(
    '/:userId/add-product',
    validateRequest(addProductToCartSchema),
    CartsController.addProductToCart
)

router.post(
    '/:userId/change-product-qty',
    validateRequest(changeProductQuantitySchema),
    CartsController.changeProductQty
)

router.delete(
    '/:userId/remove-product',
    validateRequest(removeProductFromCartSchema),
    CartsController.removeProductFromCart
)

router.get(
    '/:userId',
    validateRequest(getUserCartSchema),
    CartsController.getUserCart
)

export {router as CartsRouter}