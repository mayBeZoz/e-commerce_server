import { IOrder, OrderIndexModel, OrderModel } from "./model";

export const createOrder = (payload:Partial<IOrder>) => {
    return OrderModel.create(payload)
}

export const createOrderIndex = async () => {
    const newIndex = await OrderIndexModel.countDocuments() + 1
    return await OrderIndexModel.create({
        index:newIndex
    })
}

export const getLastOrderIndex = () => OrderIndexModel.countDocuments()


export const deletedOrderById = (id:string) => OrderModel.findByIdAndDelete(id).populate("products user")



export const getOrders = async (search:string,page:number,limit:number):Promise<{
    orders:Partial<IOrder>[],
    total_pages:number,
    curr_page:number
}> => {
    const regexQuery = new RegExp(search, "i")
    const skip = (page - 1) * limit;

    const queryObj = {
        $or: [
            { name: { $regex: regexQuery } },
            { address: { $regex: regexQuery } },
            { date: { $regex: regexQuery } },
        ],
    } 

    const totalOrders = await OrderModel.countDocuments(queryObj);
    const totalPages = Math.ceil(totalOrders / limit)

    const orders = await OrderModel
    .find(queryObj) 
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
