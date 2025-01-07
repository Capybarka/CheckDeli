import { defineStore } from 'pinia';
import { usePersonStore } from './PersonStore';
import { useWarningStore } from './WarningStore';

export const useDishStore = defineStore('DishStore', {
  state: () => ({
    dishes: [],
  }),

  actions: {
    initDish() {
      const PersonStore = usePersonStore();
      const newDish = {
        id: Date.now(),
        name: '',
        price: '',
        payer: PersonStore.persons[0],
        users: [],
      };
      this.dishes.push(newDish);
    },

    deleteDish(id) {
      this.dishes = this.dishes.filter((dish) => dish.id !== id);
    },

    updatePersons(id, newPersons) {
      const dish = this.dishes.find((dish) => dish.id === id);
      if (dish) {
        dish.users = [...newPersons];
      }
    },

    updateDish(updatedDish) {
      const index = this.dishes.findIndex((dish) => dish.id === updatedDish.id);
      if (index !== -1) {
        this.dishes[index] = { ...updatedDish };
      }
    },

    checkDishes() {
      const WarningStore = useWarningStore();
      return !this.dishes.some((dish) => {
        if (!dish.name || !dish.price || dish.users.length === 0) {
          WarningStore.showWarning('Заполните все поля!');
          return true;
        }
        return false;
      });
    },
  },
});
