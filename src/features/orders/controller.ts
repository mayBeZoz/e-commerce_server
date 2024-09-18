import { ResponseStatus } from "../../core/utils/constants";
import controllerHandler from "../../core/utils/controllerHandler";
import { findUserById } from "../users/service";
import { TCreateOrderSchema, TDeleteOrderParamsSchema, TGetOrderParamsSchema, TGetOrdersQuerySchema, TGetUserOrdersParamsSchema, TGetUserOrdersQuerySchema } from "./schema";
import { createOrder, deletedOrderById, getOrderById, getOrders, getUserOrders } from "./service";

export class OrdersController {
    static createOrder = controllerHandler<{},{},TCreateOrderSchema>(
        async (req,res,next) => {
            const {address,city,country,payment,userId} = req.body
            
              
            const user = await findUserById(userId)

            if (!user) {
                return res.status(404).json({
                    data:null,
                    error:null,
                    status:ResponseStatus.FAILED,
                    message:"user with this id is not found"
                })
            }

            const order = await createOrder({
                address,
                city,
                country,
                payment,
                userId
            })

            return res.status(201).json({
                data:order,
                error:null,
                status:ResponseStatus.SUCCESS,
                message:"order created successfully"
            })

        }
    )




   

    static getUnDeliveredOrders = controllerHandler<{},{},{},TGetOrdersQuerySchema>(
        async (req,res,next) => {
            const { search = '', page = '1', limit = '10' } = req.query || {}

            const parsedPages = parseInt(page)
            const parsedLimit = parseInt(limit)
            const ordersResult = await getOrders(search,parsedPages,parsedLimit,{isDelivered:false})

            return res.status(200).json({
                data:ordersResult,
                error:null,
                message:'got orders successfully',
                status:ResponseStatus.SUCCESS
            })
        }
    )

       

    static getDeliveredOrders = controllerHandler<{},{},{},TGetOrdersQuerySchema>(
        async (req,res,next) => {
            const { search = '', page = '1', limit = '10' } = req.query || {}

            const parsedPages = parseInt(page)
            const parsedLimit = parseInt(limit)
            const ordersResult = await getOrders(search,parsedPages,parsedLimit,{isDelivered:true})

            return res.status(200).json({
                data:ordersResult,
                error:null,
                message:'got orders successfully',
                status:ResponseStatus.SUCCESS
            })
        }
    )


    static getUserUnDeliveredOrders = controllerHandler<TGetUserOrdersParamsSchema,{},{},TGetUserOrdersQuerySchema>(
        async (req,res,next) => {
            const userId = req.params.id
            const { search = '', page = '1', limit = '10' } = req.query || {}

            const parsedPages = parseInt(page)
            const parsedLimit = parseInt(limit)

            const ordersResult = await getUserOrders(
                userId,
                search,
                parsedPages,
                parsedLimit,
                {
                    isDelivered:false
                }
            )

            return res.status(200).json({
                data:ordersResult,
                error:null,
                message:'got orders successfully',
                status:ResponseStatus.SUCCESS
            })
        }
    )


    static getUserDeliveredOrders = controllerHandler<TGetUserOrdersParamsSchema,{},{},TGetUserOrdersQuerySchema>(
        async (req,res,next) => {
            const userId = req.params.id
            const { search = '', page = '1', limit = '10' } = req.query || {}

            const parsedPages = parseInt(page)
            const parsedLimit = parseInt(limit)

            const ordersResult = await getUserOrders(
                userId,
                search,
                parsedPages,
                parsedLimit,
                {
                    isDelivered:true
                }
            )

            return res.status(200).json({
                data:ordersResult,
                error:null,
                message:'got orders successfully',
                status:ResponseStatus.SUCCESS
            })
        }
    )

    static deleteOrderById = controllerHandler<TDeleteOrderParamsSchema>(
        async (req,res,next) => {
            const id = req.params.id

            const deletedOrder = await deletedOrderById(id)

            return res.status(200).json({
                message:"order deleted successfully",
                data:deletedOrder,
                error:null,
                status:ResponseStatus.SUCCESS
            })
        }
    )

    static getOrderById = controllerHandler<TGetOrderParamsSchema>(
        async (req,res,next) => {
            const id = req.params.id

            const order = await getOrderById(id)

            if (order) {
                return res.status(200).json({
                    data:order,
                    error:null,
                    status:ResponseStatus.SUCCESS,
                    message:"got order by id successfully"
                })
            }
            return res.status(404).json({
                data:null,
                error:null,
                status:ResponseStatus.FAILED,
                message:"order with this id is not found"
            })
        }
    )
}