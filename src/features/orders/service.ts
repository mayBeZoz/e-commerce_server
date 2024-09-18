import { QueryOptions } from "mongoose";
import { IOrder, OrderIndexModel, OrderModel } from "./model";
import { findManyProductsByIds } from "../products/service";
import { CartModel } from "../carts/model";
import { getNowFullDate } from "../../core/utils/getNowFullDate";

type TCreateOrderPayload = {
    address:string,
    city:string,
    country:string,
    payment:string,
    userId:string,
}

export const createOrder = async ({
    address,
    city,
    country,
    payment,
    userId,
}:TCreateOrderPayload) => {
    const userCart = await CartModel.findOne({user:userId})
    
    const newIndex = await OrderIndexModel.countDocuments() + 1
    const orderIndex = await OrderIndexModel.create({
        index:newIndex
    })

    if (userCart) {
        const order = await OrderModel.create({
            address,
            city,
            country,
            payment,
            total:userCart.total,
            products:userCart.products,
            user:userCart.user,
            name:`order #${orderIndex.index}`,
            date:getNowFullDate()
        })

        await CartModel.deleteOne({user:userId})
        return order
    }else {
        throw new Error('user dont have cart to create order')
    }
}





export const deletedOrderById = (id:string) => OrderModel.findByIdAndDelete(id).populate("products user")



export const getOrders = async (
    search:string,
    page:number,
    limit:number,
    searchFields?:Partial<IOrder>
):Promise<{
    orders:Partial<IOrder>[],
    total_pages:number,
    curr_page:number,
}> => {
    const regexQuery = new RegExp(search, "i")
    const skip = (page - 1) * limit;

    const cleanedSearchFields = Object.fromEntries(
        Object.entries(searchFields || {}).filter(([_, v]) => v !== undefined)
    );

    const queryObj = {
        $or: [
            { name: { $regex: regexQuery } },
            { address: { $regex: regexQuery } },
            { date: { $regex: regexQuery } },
        ],
        ...cleanedSearchFields,
    }; 


    const totalOrders = await OrderModel.countDocuments(queryObj);
    const totalPages = Math.ceil(totalOrders / limit)

    const orders = await OrderModel
    .find(queryObj) 
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("products.product user")

    return {
        orders,
        total_pages:totalPages,
        curr_page:page
    }
}

export const getUserOrders = async (
    userId:string,
    search:string,
    page:number,
    limit:number,
    searchFields?:Partial<IOrder>
):Promise<{
    orders:Partial<IOrder>[],
    total_pages:number,
    curr_page:number
}> => {
    const regexQuery = new RegExp(search, "i")
    const skip = (page - 1) * limit;

    const cleanedSearchFields = Object.fromEntries(
        Object.entries(searchFields || {}).filter(([_, v]) => v !== undefined)
    );

    const queryObj = {
        $or: [
            { name: { $regex: regexQuery } },
            { address: { $regex: regexQuery } },
            { date: { $regex: regexQuery } },
        ],
        ...cleanedSearchFields,
        user:userId
    }

    const totalOrders = await OrderModel.countDocuments(queryObj);
    const totalPages = Math.ceil(totalOrders / limit)

    const orders = await OrderModel
    .find(queryObj) 
    .sort({ createdAt: -1 })        
    .skip(skip)
    .limit(limit)
    .populate("products.product user")

    return {
        orders,
        total_pages:totalPages,
        curr_page:page
    }
}

export const getOrderById = (id:string) => OrderModel.findById(id).populate("products.product user")
