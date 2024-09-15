import { z, ZodError, ZodIssueCode } from "zod";

export const createOrderSchema = z.object({
    body:z.object({
        productsIds:z.array(
            z.object({
                productId:z.string({
                    required_error:"product id is required"
                }),
                quantity:z.number({
                    required_error:'product quantity is required'
                }).min(1,'products quantity cannot be less than 1')
            })
        ),
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
    query: z.object({
        limit: z.string().optional(),
        page: z.string().optional(),
        search: z.string().optional(),
        delivered: z.preprocess((val) => {
            if (val === 'true') return true;
            if (val === 'false') return false;
            throw new z.ZodError([
                {
                    path: ['delivered'],
                    message: "Invalid value for 'delivered'. Must be 'true' or 'false'.",
                    code: z.ZodIssueCode.custom,
                },
            ]);
        }, z.boolean()).optional(), 
    }).optional(),
});

export const getUserOrdersSchema = z.object({
    query: z.object({
        limit: z.string().optional(),
        page: z.string().optional(),
        search: z.string().optional(),
        delivered: z.preprocess((val) => {
            if (val === 'true') return true;
            if (val === 'false') return false;
            throw new z.ZodError([
                {
                    path: ['delivered'],
                    message: "Invalid value for 'delivered'. Must be 'true' or 'false'.",
                    code: z.ZodIssueCode.custom,
                },
            ]);
        }, z.boolean()).optional(), 
    }).optional(),
    params:z.object({
        id:z.string({
            required_error:"user id is required"
        })
    })
});


export type TCreateOrderSchema = z.infer<typeof createOrderSchema>['body']

export type TDeleteOrderParamsSchema = z.infer<typeof deleteOrderSchema>['params']

export type TGetOrdersQuerySchema = z.infer<typeof getOrdersSchema>['query']

export type TGetOrderParamsSchema = z.infer<typeof getOrderByIdSchema>['params']

export type TGetUserOrdersQuerySchema = z.infer<typeof getUserOrdersSchema>['query']
export type TGetUserOrdersParamsSchema = z.infer<typeof getUserOrdersSchema>['params']