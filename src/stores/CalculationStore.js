import { defineStore } from 'pinia';
import { useDishStore } from './DishStore';

export const useCalculateStore = defineStore('CalculateStore', {
  state: () => {
    return {
    }
  },
  getters: {
    getTotalSum() {
      const DishStore = useDishStore();
      return DishStore.dishes.reduce((sum, dish) => sum + Number(dish.price), 0)
    },
  },
});
