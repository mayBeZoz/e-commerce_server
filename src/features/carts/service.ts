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
            userCart.products.push({product:product._id,quantity:1})
            const cart = await userCart.save()
            return cart
        
        }else {
            const newCart = await CartModel.create({
                products:[{product:product._id,quantity:1}],
                user:userId,
                total:productPrice
            })
            return newCart
        }
    }else {
        throw new Error('product with this id is not found')
    }
}

export const changeCartProductQty = async (userId:string,productId:string,quantity:number) => {
    const userCart = await CartModel.findOne({user:userId})
    const product = await findProductById(productId)
    const productExist = userCart?.products.find(curr => String(curr.product) === String(product?._id))
    const isProductExistInCart = productExist && product

    if (userCart) {

        if (isProductExistInCart) {
            const isProductQuantityAvailable = (product.amount >= quantity) && (quantity >= 1)
            if (isProductQuantityAvailable) {
            
                userCart.products = userCart.products.map(curr => {
                    if (String(curr.product) === String(product._id)) 
                    return {...curr,quantity:quantity}
                    return curr
                })

                const discountAmount = product.price * (product.discount / 100);

                const oldQty = productExist.quantity 
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

export const removeProductFromCart = async (userId:string,productId:string) => {
    const userCart = await CartModel.findOne({user:userId})
    const product = await findProductById(productId)
    const productFromCart = userCart?.products.find(curr => String(curr.product) === String(product?._id))
    const isProductExistInCart = productFromCart && product

    if (userCart) {
        if (isProductExistInCart) {
            const discountAmount = product.price * (product.discount / 100);
            const productPrice = (product.price - discountAmount) * productFromCart.quantity 

            userCart.total = userCart.total - productPrice

            userCart.products = userCart.products.filter(curr => String(curr.product) !== String(product?._id))
            const updatedCart = await userCart.save()
            return updatedCart
        }
        else {
            throw new Error('product with this id is not found in cart')
        }
    }else {
        throw new Error('their is no cart for that user id')
    }
}

export const getUserCart = async (page: number, limit: number, userId: string) => {
    const userCart = await CartModel.findOne({ user: userId }).populate('products.product user').lean();
    if (userCart) {
        const totalProducts = userCart.products.length;
        const totalPages = Math.ceil(totalProducts / limit);

        const skip = (page - 1) * limit;

        const paginatedProducts = userCart.products.reverse().slice(skip, skip + limit);

        return {
            ...userCart,
            
            products: {
                data: paginatedProducts,
                total_pages: totalPages,
                curr_page: page
            }
        };
    }
    return null
};