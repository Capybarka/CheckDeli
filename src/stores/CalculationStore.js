import { defineStore } from 'pinia';
import { useDishStore } from '@/stores/DishStore';
import { usePersonStore } from '@/stores/PersonStore';

export const useCalculationStore = defineStore('CalculationStore', {
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
        return {};
      }

      // имена пользователей
      const persons = PersonStore.persons.map((person) => person.name);
      const dishes = DishStore.dishes;

      const debts = {};
      /* 
      для каждого пользователя формируется свойство в debts, которое хранит кто кому сколько должен, например:
      {
      'Marina': { 'Anna': 0, 'Liza': 0 }
      'Anna': { 'Marina': 0, 'Liza': 0 }
      'Liza': { 'Marina': 0, 'Anna': 0 }
      }
      */
      persons.forEach((person) => {
        debts[person] = {};
        persons.forEach((other) => {
          if (person !== other) debts[person][other] = 0;
        });
      });

      //  вычисление долгов
      dishes.forEach((dish) => {
        const { price, payer, users } = dish;

        // доля долга
        const share = price / users.length;

        users.forEach((user) => {
          if (user.name !== payer.name) {
            // если пользователь не плательщик, то увеличиваем долг
            debts[user.name][payer.name] += share;
          }
        });
      });

      // упрощение долгов
      const result = {};

      persons.forEach((person) => {
        result[person] = [];
        persons.forEach((other) => {
          if (person !== other) {
            const amount = Math.min(debts[person][other], debts[other][person]);
            debts[person][other] -= amount;
            debts[other][person] -= amount;

            // если долг остался добавление информации в результат
            if (debts[person][other] > 0) {
              // если вдруг массив не существует
              if (!result[person]) {
                result[person] = [];
              }

              result[person].push({
                // должник
                debtor: other,
                // сумма долга
                amount: debts[person][other],
              });
            }
          }
        });
      });

      return result;
    },
  },
});
