import { findManyProductsByIds, findProductById } from "../products/service"
import { CartModel } from "./model"


export const addProductToCart = async (userId:string,productId:string) => {
    const userCart = await CartModel.findOne({user:userId})
    const product = await findProductById(productId)

    if (product) {
        const discountAmount = product.price * (product.discount / 100);
        const productPrice = (product.price - discountAmount)
        if (userCart) {

            userCart.total += productPrice
            userCart.products.push({productId:product._id,quantity:1})
            const cart = await userCart.save()
            return cart
        
        }else {
            const newCart = await CartModel.create({
                products:[{productId:product._id,quantity:1}],
                user:userId,
                total:productPrice
            })
            return newCart
        }
    }else {
        throw new Error('product with this id is not found')
    }
}

export const changeProductQtyInCart = async (userId:string,productId:string,quantity:number) => {
    const userCart = await CartModel.findOne({user:userId})
    const product = await findProductById(productId)
    const isProductExistInCart = userCart?.products.find(curr => curr.productId === product?._id) && product

    if (userCart) {
        if (isProductExistInCart) {
            const isProductQuantityAvailable = (product.amount <= quantity) && (quantity >= 1)
            if (isProductQuantityAvailable) {
                userCart.products = userCart.products.map(curr => {
                    if (curr.productId === product._id) 
                    return {...curr,quantity:quantity}
                    return curr
                })

                const discountAmount = product.price * (product.discount / 100);

                const oldQty = userCart.products.find(curr => curr.productId === product?._id)?.quantity as number
                const oldProductPrice = (product.price - discountAmount) * oldQty
                const totalWithoutOldProductPrice = userCart.total - oldProductPrice

                const newTotal = ((product.price - discountAmount) * quantity) + totalWithoutOldProductPrice
                
                userCart.total = newTotal
                const newCart = await userCart.save()
                return newCart
                
            }else {
                throw new Error("product needed quantity is not available")
            }
        }else {
            throw new Error('product with this id is not found in cart')
        }
    }else {
        throw new Error('their is no cart for that user id')
    }
}