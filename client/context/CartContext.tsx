import { dummyCart, dummyWishlist } from "@/assets/assets";
import { CartItem, Product, WishlistContextType } from "@/constants/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type CartItems = {
    id: string;
    productId: string;
    product: Product;
    quantity: number;
    size: string;
    price: number;
}

type CartConextType = {
    cartItems: CartItem[],
    addToCart: (product: Product, size: string)=>Promise<void>;
    removeFromCart: (itemId: string, size: string)=>Promise<void>;
    updateQuanitity: (itemId: string, quantity: number, size: string)=>Promise<void>;
    clearCart: ()=>Promise<void>;
    cartTotal: number;
    itemCount: number;
    isLoading: boolean;
}


const CartContext = createContext<CartConextType| undefined>(undefined)

export function CartProvider({children}: {children: ReactNode}){

    const [cartItems,SetCartItems] = useState<CartItem[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [cartTotal, setCartTotal] = useState(0)

    const fetchCart = async ()=> {
        setIsLoading(true);
        const serverCart = dummyCart;
        const mappedItems: CartItem[] = serverCart.items.map((item: any)=>({
            id:item.product._id,
            productId: item.product._id,
            product: item.product,
            quantity: item.quantity,
            size: item?.size || 'M',
            price: item.price
        }));
        SetCartItems(mappedItems);
        setCartTotal(serverCart.totalAmount);
        setIsLoading(false)
    }

    const addToCart = async (product:Product, size: string) => {

    }

    const removeFromCart = async (productId:string, size: string) => {
        
    }

    const updateQuanitity = async (productId:string, quantity: number, size: string = 'M') => {
        
    }

     const clearCart = async () => {
        
    }

    const itemCount = cartItems.reduce((sum, item)=> sum + item.quantity, 0)

    useEffect(()=>{
        fetchCart();
    },[])

  return (
    <CartContext.Provider value={{
        cartItems, addToCart, removeFromCart, updateQuanitity,clearCart, cartTotal, itemCount, isLoading
    }}>
        {children}
    </CartContext.Provider>
  )
}

export function useCart(){
    const context = useContext(CartContext);
    if(context === undefined){
        throw new Error('UseCart must be used within a CartProvider')
    }
    return context
}