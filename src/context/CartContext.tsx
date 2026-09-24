"use client";
// 1. Import createContext, useContext, useState, useEffect, ReactNode from "react"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Product } from "@/types/product";

// 3. Type CartItem = a Product plus a quantity
type CartItem = Product & { quantity: number };

// 4. Type CartContextType = everything components are allowed to use:
//    - data:      cart, cartCount, cartTotal
//    - functions: addToCart, removeFromCart, increaseQuantity,
//                 decreaseQuantity, clearCart
interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
}

// 5. A constant for the localStorage key ("cart")
const CART_LOCAL_STORAGE_KEY = "cartKey";

// 6. Create the context (starts as undefined)
const CartContext = createContext<CartContextType | undefined>(undefined);

// 7. CartProvider({ children })
export function CartProvider({ children }: { children: ReactNode }) {
  // 7a
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  //    7b. Effect, runs ONCE on mount:
  //        read localStorage -> JSON.parse -> setCart -> setHasLoaded(true)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setCart(JSON.parse(stored));
    } catch {
      localStorage.removeItem(CART_LOCAL_STORAGE_KEY); // corrupted data: start fresh
    }
    setHasLoaded(true);
  }, []);
  //    7c. Effect, runs when cart changes:
  //        if loaded -> JSON.stringify(cart) -> save to localStorage
  useEffect(() => {
    if (!hasLoaded) return; // never save the empty starting cart over the real one
    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, hasLoaded]);
  //    7d. Functions that ONLY call setCart (no localStorage in here!)
  //        - addToCart: if item exists, +1 quantity, else add with quantity 1
  //        - removeFromCart: filter the item out
  //        - increaseQuantity / decreaseQuantity (remove at 0)
  //        - clearCart: empty array
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => setCart([]);

  //    7e. Derived values (calculated, not stored in state):
  //        - cartCount = sum of quantities
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  //    7f. Return the Provider with all of the above as value, wrapping children
  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 8. useCart hook:
//    get the context, throw a clear error if used outside CartProvider
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
