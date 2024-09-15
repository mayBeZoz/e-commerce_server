import express from 'express';
import validateRequest from "../../core/middlewares/validateRequest";
import { CartsController } from './controller';
import { addProductToCartSchema } from './schema';

const router = express.Router()


router.post(
    '/user-cart/:userId',
    validateRequest(addProductToCartSchema),
    CartsController.addProductToCart
)

router.get(
    '/user-cart/:userId',
    validateRequest(addProductToCartSchema),
    CartsController.addProductToCart
)

export {router as CartsRouter}