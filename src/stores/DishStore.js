import { defineStore } from 'pinia';
import { usePersonStore } from './PersonStore';

export const useDishStore = defineStore('DishStore', {
  state: () => {
    return {
      dishes: [],
    };
  },

  actions: {
    initDish() {
      const PersonStore = usePersonStore()
      const newDish = {
        id: Date.now(),
        name: '',
        price: '',
        payer: PersonStore.persons[0],
        users: [],
      };
      this.dishes.push(newDish)
      console.log('init', PersonStore.persons[0])
    },

    deleteDish(id) {
      this.dishes = this.dishes.filter((dish) => dish.id !== id)
    },

    updateUsers(id, newUsers) {
      const idx = this.dishes.findIndex((dish) => dish.id === id)

      if (idx !== -1) {
        this.dishes[idx].users = [...newUsers]
      }
    },

    checkDishes() {
      let flag = true
      this.dishes.forEach((dish) => {
        if (!dish.name || dish.price === '' || dish.users.length === 0) {
          flag = false
        }
      })
      return flag
    },
  },
});
