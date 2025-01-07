import { defineStore } from 'pinia';
import { useDishStore } from './DishStore';

export const useCalculateStore = defineStore('CalculateStore', {
  state: () => {},
  getters: {
    getTotalSum() {
      const DishStore = useDishStore();
      let total = 0;
      DishStore.dishes.forEach((dish) => (total += Number(dish.price)));
      return total;
    },
  },
});
