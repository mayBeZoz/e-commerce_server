import { QueryOptions } from "mongoose";
import { IOrder, OrderIndexModel, OrderModel } from "./model";
import { findManyProductsByIds } from "../products/service";

type TCreateOrderPayload = {
    address:string,
    city:string,
    country:string,
    payment:string,
    userId:string,
    productsIds:{
        productId:string,
        quantity:number
    }[]
}

export const createOrder = async ({
    address,
    city,
    country,
    payment,
    productsIds,
    userId,
}:TCreateOrderPayload) => {
    
}

export const createOrderIndex = async () => {
    const newIndex = await OrderIndexModel.countDocuments() + 1
    return await OrderIndexModel.create({
        index:newIndex
    })
}

export const getLastOrderIndex = () => OrderIndexModel.countDocuments()


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
    .populate("products user")

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
    .populate("products user")

    return {
        orders,
        total_pages:totalPages,
        curr_page:page
    }
}

export const getOrderById = (id:string) => OrderModel.findById(id).populate("products user")
