// productStore.js
import {create} from 'zustand';
import axios from 'axios';

const useProductStore = create((set) => ({
  products: [],
  setProducts: (fetchedProducts) => set({ products: fetchedProducts }),
  fetchProducts: async () => {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products');
      const fetchedProducts = response.data;
      set({ products: fetchedProducts });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
}));

export default useProductStore;
