import { z } from "zod";

export const addProductToCartSchema = z.object({
    body:z.object({
        productId:z.string({
            required_error:"product id is required"
        })
    }),
    params:z.object({
        userId:z.string({
            required_error:"user id is required"
        }),
    })
}) 


export const removeProductFromCartSchema = z.object({
    body:z.object({
        productId:z.string({
            required_error:"product id is required"
        })
    }),
    params:z.object({
        userId:z.string({
            required_error:"user id is required"
        }),
    })
}) 



export const changeProductQuantitySchema = z.object({
    body:z.object({
        quantity:z.number({
            required_error:"product quantity is required"
        }).min(1).default(1),
        productId:z.string({
            required_error:"product id is required"
        })
    }),
    params:z.object({
        userId:z.string({
            required_error:"user id is required"
        }),
    })
})

export const getUserCartSchema = z.object({
    params:z.object({
        userId:z.string({
            required_error:"user id is required"
        }),
    }),
    query:z.object({
        limit:z.string().optional(),
        page:z.string().optional(),
    })
})

export const clearCartSchema = z.object({
    params:z.object({
        userId:z.string({
            required_error:"user id is required"
        }),
    })
})


export type TAddProductToCartPayload = z.infer<typeof addProductToCartSchema>['body']
export type TAddProductToCartParams = z.infer<typeof addProductToCartSchema>['params']

export type TChangeProductQuantityPayload = z.infer<typeof changeProductQuantitySchema>['body']
export type TChangeProductQuantityParams = z.infer<typeof changeProductQuantitySchema>['params']

export type TRemoveProductFromCartPayload = z.infer<typeof removeProductFromCartSchema>['body']
export type TRemoveProductFromCartParams = z.infer<typeof removeProductFromCartSchema>['params']

export type TGetUserCartParams = z.infer<typeof getUserCartSchema>['params']
export type TGetUserCartQuery = z.infer<typeof getUserCartSchema>['query']
export type TClearCartParams = z.infer<typeof clearCartSchema>['params']