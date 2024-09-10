import { ResponseStatus } from "../../core/utils/constants";
import controllerHandler from "../../core/utils/controllerHandler";
import { findManyByIds } from "../products/service";
import { findUserById } from "../users/service";
import { TCreateOrderSchema, TDeleteOrderParamsSchema, TGetOrderParamsSchema, TGetOrdersQuerySchema, TSubmitOrderAsDeliveredSchema } from "./schema";
import { createOrder, createOrderIndex, deletedOrderById, getOrderById, getOrders } from "./service";

export class OrdersController {
    static createOrder = controllerHandler<{},{},TCreateOrderSchema>(
        async (req,res,next) => {
            const {address,city,country,payment,productsIds,userId} = req.body
            const products = (await findManyByIds(productsIds))
            const total = products.reduce((sum, product) => {
                const discountedPrice = product.price * (1 - product.discount / 100);
                return sum + discountedPrice;
            }, 0);
              
            const user = await findUserById(userId)

            if (!user) {
                return res.status(404).json({
                    data:null,
                    error:null,
                    status:ResponseStatus.FAILED,
                    message:"user with this id is not found"
                })
            }

            const orderDate = new Date().toLocaleDateString()
            const orderName = `order #${(await createOrderIndex())}`

            const order = await createOrder({
                products:products.map(curr => curr._id),
                user:user._id,
                name:orderName,
                date:orderDate,
                address,
                city,
                country,
                payment,
                total
            })

            return res.status(201).json({
                data:order,
                error:null,
                status:ResponseStatus.SUCCESS,
                message:"order created successfully"
            })

        }
    )

    static submitOrderAsDelivered = controllerHandler<TSubmitOrderAsDeliveredSchema,{}>(
        async (req,res,next) => {
            const id = req.params.id
            
        }
    )

    // static getOrdersCount = controllerHandler<>

    static getOrders = controllerHandler<{},{},{},TGetOrdersQuerySchema>(
        async (req,res,next) => {
            const { search = '', page = '1', limit = '10' } = req.query || {}
            const parsedPages = parseInt(page)
            const parsedLimit = parseInt(limit)
            
            const ordersResult = await getOrders(search,parsedPages,parsedLimit)

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

            return res.status(200).json({
                data:order,
                error:null,
                status:ResponseStatus.SUCCESS,
                message:"got order by id successfully"
            })
        }
    )
}