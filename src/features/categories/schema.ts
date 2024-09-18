import { z } from "zod";

export const getAllCategoriesSchema = z.object({
    query:z.object({
        limit:z.string().optional(),
        page:z.string().optional(),
        search:z.string().optional()
    }).optional(),
})

export const deleteCategorySchema = z.object({
    params:z.object({
        id:z.string({
            required_error:'category id is required'
        })
    })
})

export const updateCategorySchema = z.object({
    params:z.object({
        id:z.string({
            required_error:'category id is required'
        })
    }),
    body:z.object({
        name:z.string({
            required_error:"category name is required"
        }).optional()
    })
})


export const createCategorySchema = z.object({
    body:z.object({
        name:z.string({
            required_error:"category name is required"
        })
    })
})

export type TGetAllCategoriesQuery = z.infer<typeof getAllCategoriesSchema>['query']

export type TDeleteCategoryParams = z.infer<typeof deleteCategorySchema>['params']

export type TCreateCategoryPayload = z.infer<typeof createCategorySchema>['body']

export type TUpdateCategoryParams = z.infer<typeof updateCategorySchema>['params']
export type TUpdateCategoryPayload = z.infer<typeof updateCategorySchema>['body']