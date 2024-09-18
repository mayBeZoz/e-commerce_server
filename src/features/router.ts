import { UsersRouter } from "./users/router";
import { ProductsRouter } from "./products/router";
import express from 'express';
import { OrdersRouter } from "./orders/router";
import { CartsRouter } from "./carts/router";
import { CategoriesRouter } from "./categories/router";

const router = express.Router()

router.use('/api/users',UsersRouter)
router.use('/api/products',ProductsRouter)
router.use('/api/orders',OrdersRouter)
router.use('/api/carts',CartsRouter)
router.use('/api/categories',CategoriesRouter)

export default router