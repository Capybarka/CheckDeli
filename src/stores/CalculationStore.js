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
    // calculateDebts() {
    //   const DishStore = useDishStore()
    //   const PersonStore = usePersonStore()

    //   if (!DishStore.dishes.length || !PersonStore.persons.length) {
    //     return []
    //   }

    //   // имена пользователей
    //   const persons = PersonStore.persons.map(person => person.name)

    //   const dishes = DishStore.dishes

    //   // объект для хранения долгов
    //   const debts = {}

    //   // для каждого пользователя формируется свойство в debts, которое хранит кто кому сколько должен
    //   /* например,
    //   {
    //     'Marina': { 'Anna': 0, 'Liza': 0 }
    //     'Anna': { 'Marina': 0, 'Liza': 0 }
    //     'Liza': { 'Marina': 0, 'Anna': 0 }
    //   }
    //   */
    //   persons.forEach(person => {
    //     debts[person] = {}
    //     persons.forEach(other => {
    //       if (person !== other) debts[person][other] = 0
    //     })
    //   })

    //   // вычисление долгов
    //   dishes.forEach(dish => {
    //     const { price, payer, users } = dish
    //     const share = price / users.length

    //     users.forEach(user => {
    //       // если пользователь не плательщик, то увеличиваем долг
    //       if (user.name !== payer.name) {
    //         debts[user.name][payer.name] += share
    //       }
    //     })
    //   })

    //   // упрощение долгов
    //   const result = []
    //   persons.forEach(person => {
    //     result[person] = []; // Инициализируем пустой массив для каждого пользователя
    //     persons.forEach(other => {
    //       if (person !== other) {
    //         // Упрощаем взаимные долги
    //         const amount = Math.min(debts[person][other], debts[other][person]);
    //         debts[person][other] -= amount;
    //         debts[other][person] -= amount;

    //         // Если долг остался, добавляем информацию в результат
    //         if (debts[person][other] > 0) {
    //           // Инициализируем массив, если не существует
    //           if (!result[person]) {
    //             result[person] = [];
    //           }

    //           // Добавляем данные о долге
    //           result[person].push({
    //             debtor: other, // Должник
    //             amount: debts[person][other] // Сумма долга
    //           });
    //         }
    //       }
    //     });
    //   });
    //   console.log(result)
    //   return result
    // }
    calculateDebts() {
      const DishStore = useDishStore(); // Хранилище блюд
      const PersonStore = usePersonStore(); // Хранилище пользователей

      if (!DishStore.dishes.length || !PersonStore.persons.length) {
        console.error('Данные для расчёта отсутствуют');
        return {};
      }

      // Список пользователей и блюд
      const persons = PersonStore.persons.map((person) => person.name);
      const dishes = DishStore.dishes;

      // Объект для долгов
      const debts = {};

      // Инициализация долгов
      persons.forEach((person) => {
        debts[person] = {}; // Для каждого человека создаём пустой объект
        persons.forEach((other) => {
          if (person !== other) debts[person][other] = 0; // Инициализируем долг 0
        });
      });

      // Подсчёт долгов на основе блюд
      dishes.forEach((dish) => {
        const { price, payer, users } = dish;

        // Проверяем корректность данных
        if (!price || !payer || !Array.isArray(users) || users.length === 0) {
          console.warn(`Пропущены некорректные данные блюда: ${JSON.stringify(dish)}`);
          return;
        }

        const share = price / users.length; // Доля стоимости для каждого пользователя

        users.forEach((user) => {
          if (user.name !== payer.name) {
            // Проверяем, чтобы пользователь не был плательщиком
            debts[user.name][payer.name] += share; // Увеличиваем долг
          }
        });
      });

      // Упрощение долгов
      const result = {}; // Объект для хранения результата

      persons.forEach((person) => {
        result[person] = []; // Инициализируем пустой массив для каждого пользователя
        persons.forEach((other) => {
          if (person !== other) {
            // Упрощаем взаимные долги
            const amount = Math.min(debts[person][other], debts[other][person]);
            debts[person][other] -= amount;
            debts[other][person] -= amount;

            // Если долг остался, добавляем информацию в результат
            if (debts[person][other] > 0) {
              // Инициализируем массив, если не существует
              if (!result[person]) {
                result[person] = [];
              }

              // Добавляем данные о долге
              result[person].push({
                debtor: other, // Должник
                amount: debts[person][other], // Сумма долга
              });
            }
          }
        });
      });

      return result; // Возвращаем объект с долгами
    },
  },
});
