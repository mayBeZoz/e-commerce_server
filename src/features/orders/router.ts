import express from 'express';
import validateRequest from "../../core/middlewares/validateRequest";
import { createOrderSchema, deleteOrderSchema, getOrdersSchema } from './schema';
import { OrdersController } from './controller';


const router = express.Router()

router.post(
    '/',
    validateRequest(createOrderSchema),
    OrdersController.createOrder
)

router.get(
    '/',
    validateRequest(getOrdersSchema),
    OrdersController.getOrders
)

router.delete(
    '/:id',
    validateRequest(deleteOrderSchema),
    OrdersController.deleteOrderById
)


export {router as OrdersRouter}