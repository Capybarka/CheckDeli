<template>
  <div>
    <v-sheet
      class="d-flex pa-4 my-5 align-center justify-center rounded-xl elevation-5"
      color="background-dark"
    >
      <h2 class="text-primary font-weight-bold text-center">Добавьте блюда</h2>
    </v-sheet>

    <v-sheet
      color="background-dark"
      class="min-height-50per pa-5 mb-5 rounded-xl elevation-5"
      elevation="10"
    >
      <empty-message v-if="DishStore.dishes.length === 0">Пока ничего нет</empty-message>

      <dish-card
        v-for="dish in DishStore.dishes"
        :key="dish"
        :dish="dish"
        class="mb-10 elevation-10"
      >
      </dish-card>

      <v-btn
        block
        prepend-icon="mdi-plus-circle"
        class="rounded-xl elevation-5 align-center bg-primary"
        @click="initDish"
      >
        Добавить позицию
      </v-btn>
    </v-sheet>

    <v-sheet
      color="background-dark"
      class="d-flex flex-column pa-4 rounded-xl elevation-5 mb-10 align-center"
    >
      <p class="mb-5 text-center text-lg-h5 text-sm-h6">Промежуточный итог:</p>
      <div class="d-flex align-center">
        <p class="text-h4">{{ CalculationStore.getTotalSum }}</p>
        <v-icon>mdi-currency-rub</v-icon>
      </div>
    </v-sheet>

    <v-row justify="center">
      <v-col cols="auto">
        <v-btn
          prepend-icon="mdi-hand-pointing-left"
          color="primary"
          @click="router.push('/persons')"
        >
          Назад
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          append-icon="mdi-hand-pointing-right"
          color="primary"
          @click="goToResult"
        >
          Далеe
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useDishStore } from '@/stores/DishStore';
import { useCalculationStore } from '@/stores/CalculationStore';
import { useWarningStore } from '@/stores/WarningStore';
import { useRouter } from 'vue-router';

import EmptyMessage from '@/components/EmptyMessage.vue';
import DishCard from '@/components/DishCard.vue';

const DishStore = useDishStore();
const CalculationStore = useCalculationStore();
const WarningStore = useWarningStore();

const router = useRouter();

const initDish = () => {
  DishStore.initDish();
};

const goToResult = () => {
  if (!DishStore.checkDishes()) {
    WarningStore.showWarning('Заполните все поля!');
    return;
  } else if (DishStore.dishes.length < 2) {
    WarningStore.showWarning('Добавьте минимум 2 блюда!');
    return;
  }
  router.push('/result');
};
</script>
