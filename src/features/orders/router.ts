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
    '/undelivered',
    validateRequest(getOrdersSchema),
    OrdersController.getUnDeliveredOrders 
)

router.get(
    '/delivered',
    validateRequest(getOrdersSchema),
    OrdersController.getDeliveredOrders 
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
    '/user-orders/:id/undelivered',
    validateRequest(getUserOrdersSchema),
    OrdersController.getUserUnDeliveredOrders
)
router.get(
    '/user-orders/:id/delivered',
    validateRequest(getUserOrdersSchema),
    OrdersController.getUserDeliveredOrders
)


export {router as OrdersRouter}