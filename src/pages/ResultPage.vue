<template>
  <v-sheet class="pa-5 mb-5 bg-background-light elevation-10 rounded-xl">
    <h2 class="text-center mb-3 text-primary">Результаты</h2>
    <h3 class="text-center">Кто кому и сколько должен</h3>
  </v-sheet>
  <v-sheet
    variant="tonal"
    class="result-content pa-4 mb-5 elevation-10 rounded-xl bg-background-dark"
  >
  <v-btn color="primary" @click="calculateDebts">Рассчитать</v-btn>

  <ul>
      <li v-for="debt in debts" :key="debt">{{ debt }}</li>
    </ul>
  </v-sheet>
  <v-row justify="center">
    <v-col cols="auto">
      <v-btn
        color="primary"
        @click="router.push('/')"
      >
        На главную
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {useCalculationStore} from '@/stores/CalculationStore';
import {useDishStore} from '@/stores/DishStore'
import {ref} from 'vue'

const router = useRouter()
const CalculationStore = useCalculationStore()
const DishStore = useDishStore()
const debts = ref([]); // Массив для хранения результатов долгов

const calculateDebts = () => {
  DishStore.getAllDishes()
  debts.value = CalculationStore.calculateDebts(); // Получаем результаты расчетов
};

</script>
