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
        product:z.string({
            required_error:"product id is required"
        })
    }),
    params:z.object({
        userId:z.string({
            required_error:"user id is required"
        }),
    })
}) 


export const incProductQuantitySchema = z.object({
    body:z.object({
        quantity:z.number({
            required_error:"product quantity is required"
        }).min(1).default(1).optional(),
        product:z.string({
            required_error:"product id is required"
        })
    }),
    params:z.object({
        userId:z.string({
            required_error:"user id is required"
        }),
    })
})


export const decProductQuantitySchema = z.object({
    body:z.object({
        quantity:z.number({
            required_error:"product quantity is required"
        }).min(1),
        product:z.string({
            required_error:"product id is required"
        })
    }),
    params:z.object({
        userId:z.string({
            required_error:"user id is required"
        }),
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

export type TIncProductQuantityPayload = z.infer<typeof incProductQuantitySchema>['body']
export type TIncProductQuantityParams = z.infer<typeof incProductQuantitySchema>['params']

export type TDecProductQuantityPayload = z.infer<typeof decProductQuantitySchema>['body']
export type TDecProductQuantityParams = z.infer<typeof decProductQuantitySchema>['params']

export type TRemoveProductQuantityPayload = z.infer<typeof removeProductFromCartSchema>['body']
export type TRemoveProductQuantityParams = z.infer<typeof removeProductFromCartSchema>['params']

export type TClearCartParams = z.infer<typeof clearCartSchema>['params']