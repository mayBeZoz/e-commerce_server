import { z } from "zod";

export const createOrderSchema = z.object({
    body:z.object({
        productsIds:z.array(z.string(),{
            required_error:"products ids are required"
        }),
        userId:z.string({
            required_error:"user id is required"
        }),
        address:z.string({
            required_error:"address is required"
        }),
        city:z.string({
            required_error:"city is required"
        }),
        country:z.string({
            required_error:"country is required"
        }),
        payment:z.string({
            required_error:"payment is required"
        })
    }).strict()
})

export const submitOrderAsDeliveredSchema = z.object({
    params:z.object({
        id:z.string({
            required_error:"order id is required"
        })
    })
})


export const deleteOrderSchema = z.object({
    params:z.object({
        id:z.string({
            required_error:"order id is required"
        })
    })
})


export const getOrderByIdSchema = z.object({
    params:z.object({
        id:z.string({
            required_error:"order id is required"
        })
    })
})

export const getOrdersSchema = z.object({
    query:z.object({
        limit:z.string().optional(),
        page:z.string().optional(),
        search:z.string().optional()
    }).optional()
})

export type TCreateOrderSchema = z.infer<typeof createOrderSchema>['body']
export type TSubmitOrderAsDeliveredSchema = z.infer<typeof submitOrderAsDeliveredSchema>['params']

export type TDeleteOrderParamsSchema = z.infer<typeof deleteOrderSchema>['params']

export type TGetOrdersQuerySchema = z.infer<typeof getOrdersSchema>['query']

export type TGetOrderParamsSchema = z.infer<typeof getOrderByIdSchema>['params']