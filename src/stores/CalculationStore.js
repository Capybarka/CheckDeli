import { defineStore } from 'pinia';
import { useDishStore } from '@/stores/DishStore';
import { usePersonStore } from '@/stores/PersonStore';

export const useCalculationStore = defineStore('CalculationStore', {
  state: () => {
    return {};
  },
  getters: {
    getTotalSum() {
      const DishStore = useDishStore();
      return DishStore.dishes.reduce((sum, dish) => sum + Number(dish.price), 0);
    },
  },
  actions: {
    calculateDebts() {
      const DishStore = useDishStore();
      const PersonStore = usePersonStore();
    
      if (!DishStore.dishes.length || !PersonStore.persons.length) {
        console.error("Данные для расчёта отсутствуют");
        return [];
      }
    
      const persons = PersonStore.persons.map(person => person.name);
      const dishes = DishStore.dishes;
    
      const debts = {};
    
      // Инициализация долгов
      persons.forEach(person => {
        debts[person] = {};
        persons.forEach(other => {
          if (person !== other) debts[person][other] = 0;
        });
      });
    
      // Подсчёт долгов
      dishes.forEach(dish => {
        const { price, payer, users } = dish;
    
        if (!price || !payer || !Array.isArray(users) || users.length === 0) {
          console.warn(`Пропущены некорректные данные блюда: ${JSON.stringify(dish)}`);
          return;
        }
    
        const share = price / users.length;
    
        users.forEach(user => {
          if (user.name !== payer.name) {
            debts[user.name][payer.name] += share;
          }
        });
      });
    
      // Сокращение долгов
      const result = [];
      persons.forEach(person => {
        persons.forEach(other => {
          if (person !== other) {
            const amount = Math.min(debts[person][other], debts[other][person]);
            debts[person][other] -= amount;
            debts[other][person] -= amount;
    
            if (debts[person][other] > 0) {
              result.push(`${person} должна ${other} ${debts[person][other].toFixed(2)}р`);
            }
          }
        });
      });
    
      return result;
    }
    
  }
});
