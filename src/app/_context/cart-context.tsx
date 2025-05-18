/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getCartCount } from "../api/action/basket";
import { useSession } from "next-auth/react";

type CartContextType = {
  cartCount: number;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  refreshCart: async () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = async () => {
    if (session?.user?.id) {
      try {
        const count = await getCartCount();
        setCartCount(count);
      } catch (error) {
        console.error("Error refreshing cart:", error);
      }
    }
  };

  useEffect(() => {
    void refreshCart();
  }, [session]);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);