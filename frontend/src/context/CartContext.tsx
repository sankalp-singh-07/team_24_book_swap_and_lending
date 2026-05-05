import React, { createContext, useContext, useState } from "react";

type CartType = "rent" | "buy";

interface Cart {
  rent: any[];
  buy: any[];
}

interface CartContextType {
  cart: Cart;
  addToCart: (book: any, type: CartType) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart>({ rent: [], buy: [] });

  const addToCart = (book: any, type: CartType) => {
    setCart((prevCart) => {
      if (type === "rent") {
        return { ...prevCart, rent: [...prevCart.rent, book] };
      } else {
        return { ...prevCart, buy: [...prevCart.buy, book] };
      }
    });
    console.log("Current Cart:", { ...cart, [type]: [...cart[type], book] });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
