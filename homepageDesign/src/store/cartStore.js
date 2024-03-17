import { create } from "zustand";

const useCartStore = create((set) => ({
  cartItems: [],
  

  addToCart: (item) => {
    set((state) => {
      const existingItemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );
  
      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, update its quantity
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        return { cartItems: updatedCartItems };
      } else {
        // If the item does not exist in the cart, add it with quantity 1
        return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
      }
    });
  },

  removeFromCart: (itemId) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== itemId),
    }));
  },

  handleCartProductQuantity: (type, product) => {
    set((state) => {
      const items = [...state.cartItems];
      const index = items.findIndex((p) => p.id === product.id);

      if (index === -1) {
        // Product not found in cart
        return state;
      }

      if (type === "inc") {
        items[index].quantity += 1;
        const updatedTotalAmount = state.totalAmount + 1; // Update total amount
        return { cartItems: items, totalAmount: updatedTotalAmount };
      } else if (type === "dec") {
        if (items[index].quantity === 1) {
          return state;
        }
        items[index].quantity -= 1;
        const updatedTotalAmount = state.totalAmount - 1; // Update total amount
        return { cartItems: items, totalAmount: updatedTotalAmount };
      }
    });
  },


}));

export default useCartStore;
