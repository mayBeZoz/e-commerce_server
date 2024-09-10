import { UsersRouter } from "./users/router";
import { ProductsRouter } from "./products/router";
import express from 'express';
import { OrdersRouter } from "./orders/router";

const router = express.Router()

router.use('/api/users',UsersRouter)
router.use('/api/products',ProductsRouter)
router.use('/api/orders',OrdersRouter)

export default router