import express from 'express';
import validateRequest from "../../core/middlewares/validateRequest";
import { createCategorySchema, deleteCategorySchema, getAllCategoriesSchema, updateCategorySchema } from './schema';
import { CategoriesController } from './controller';
import { updateCategoryById } from './service';

const router = express.Router();

router.get(
    '/',
    validateRequest(getAllCategoriesSchema),
    CategoriesController.getCategories
)

router.post(
    '/',
    validateRequest(createCategorySchema),
    CategoriesController.createCategory
)


router.delete(
    '/:id',
    validateRequest(deleteCategorySchema),
    CategoriesController.deleteCategoryById
)

router.patch(
    '/:id',
    validateRequest(updateCategorySchema),
    CategoriesController.updateCategoryById
)

export {router as CategoriesRouter}