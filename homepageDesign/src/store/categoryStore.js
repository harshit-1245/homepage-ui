import {create} from 'zustand';

export const useCategoryStore = create((set) => ({
  selectedCategory: 'Electronics',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));