import express from 'express';
import validateRequest from "../../core/middlewares/validateRequest";
import { createOrderSchema, deleteOrderSchema, getOrderByIdSchema, getOrdersSchema, getUserOrdersSchema } from './schema';
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

router.get(
    '/:id',
    validateRequest(getOrderByIdSchema),
    OrdersController.getOrderById
)


router.get(
    '/user-orders/:id',
    validateRequest(getUserOrdersSchema),
    OrdersController.getUserOrders
)


export {router as OrdersRouter}