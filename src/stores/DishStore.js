import { defineStore } from 'pinia';
import { usePersonStore } from './PersonStore';
import { useWarningStore } from './WarningStore';

export const useDishStore = defineStore('DishStore', {
  state: () => {
    return {
      dishes: [],
    };
  },

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
      const idx = this.dishes.findIndex((dish) => dish.id === id);

      if (idx !== -1) {
        this.dishes[idx].users = [...newPersons];
      }
    },

    checkDishes() {
      const WarningStore = useWarningStore();

      const isValid = !this.dishes.some((dish) => {
        if (!dish.name || !dish.price || dish.users.length === 0) {
          WarningStore.showWarning('Заполните все поля!');
          return true; 
        }
        return false;
      });

      return isValid;
    },
  },
});
