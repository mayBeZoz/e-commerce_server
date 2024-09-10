import express from 'express';
import validateRequest from "../../core/middlewares/validateRequest";
import { createProductSchema, deleteProductSchema, getAllProductsSchema, getProductSchema, updateProductSchema } from './shcema';
import { ProductController } from './controller';

const router = express.Router();

router.post(
    '/',
    validateRequest(createProductSchema),
    ProductController.createProduct
)

router.get(
    '/',
    validateRequest(getAllProductsSchema),
    ProductController.getAllProducts
)

router.delete(
    '/:id',
    validateRequest(deleteProductSchema),
    ProductController.deleteProductById
)

router.patch(
    '/:id',
    validateRequest(updateProductSchema),
    ProductController.updateProductById
)


router.get(
    '/:id',
    validateRequest(getProductSchema),
    ProductController.getProductById
)

export { router as ProductsRouter }
