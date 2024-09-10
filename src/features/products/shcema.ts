import { z } from "zod";

export const createProductSchema = z.object({
    body:z.object({
        name:z.string({
            required_error:'product name is required'
        }),
    
        description:z.string({
            required_error:'product description is required'
        }),
    
        price:z.number({
            required_error:'product price is required'
        }),
    
        quantity:z.number({
            required_error:'product quantity is required'
        }).min(0,'product quantity cannot be less than 0'),
    
        variants:z.array(
            z.object({
                name:z.string({
                    required_error:"variant name is required"
                }),
    
                values:z.array(
                    z.string({
                        required_error:'variant value is required'
                    }),
                    {
                        required_error:'variant values is required'
                    }
                )
            })
        ).optional(),
    }).strict()
})


export const updateProductSchema = z.object({
    body:z.object({
        name:z.string({
            required_error:'product name is required'
        }).optional(),
    
        description:z.string({
            required_error:'product description is required'
        }).optional(),
    
        price:z.number({
            required_error:'product price is required'
        }).optional(),
    
        quantity:z.number({
            required_error:'product quantity is required'
        }).min(0,'product quantity cannot be less than 0').optional(),
    
        variants:z.array(
            z.object({
                name:z.string({
                    required_error:"variant name is required"
                }),
    
                values:z.array(
                    z.string({
                        required_error:'variant value is required'
                    }),
                    {
                        required_error:'variant values is required'
                    }
                )
            })
        ).optional(),
    }).strict(),
    params:z.object({
        id:z.string({
            required_error:'product id is required'
        })
    })
})


export const deleteProductSchema = z.object({
    params:z.object({
        id:z.string({
            required_error:'product id is required'
        })
    })
})


export const getProductSchema = z.object({
    params:z.object({
        id:z.string({
            required_error:'product id is required'
        })
    })
})

export const getAllProductsSchema = z.object({
    query:z.object({
        limit:z.string().optional(),
        page:z.string().optional(),
        search:z.string().optional()
    }).optional(),
})


export type TCreateProductSchemaPayload = z.infer<typeof createProductSchema>['body']

export type TUpdateProductSchemaPayload = z.infer<typeof updateProductSchema>['body']
export type TUpdateProductSchemaParams = z.infer<typeof updateProductSchema>['params']

export type TDeleteProductSchemaParams = z.infer<typeof deleteProductSchema>['params']

export type TGetProductSchemaParams = z.infer<typeof getProductSchema>['params']

export type TGetAllProductSchema = z.infer<typeof getAllProductsSchema>['query']