<template>
  <v-sheet class="pa-5 mb-5 bg-background-light elevation-10 rounded-xl">
    <h2 class="text-center mb-3 text-primary">Результаты</h2>
    <h3 class="text-center">Кто кому и сколько должен</h3>
  </v-sheet>
  <v-sheet
    variant="tonal"
    class="result-content pa-4 mb-5 elevation-10 rounded-xl bg-background-dark"
  >
    <div class="d-flex flex-column ga-4">
      <v-card
        v-for="(debtorList, person) in debts"
        class="bg-background-light mb-5 pa-3 rounded-xl"
        :key="person"
      >
        <v-card-title class="text-center rounded-xl text-primary font-weight-bold"> {{ person }} должен: </v-card-title>
        <p
          v-if="debtorList.length === 0"
          class="text-center font-weight-bold"
        >
          Никому он ничего не должен!
        </p>
        <div
          v-else
          class="d-flex justify-center"
        >
          <p
            v-for="debt in debtorList"
            :key="debt.debtor"
            class="text-center font-weight-bold align-center"
          >
            {{ debt.debtor }} - {{ debt.amount.toFixed(2) }}
          </p>
          <v-icon
            icon="mdi-currency-rub"
            size="small"
          />
        </div>
      </v-card>
    </div>
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
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCalculationStore } from '@/stores/CalculationStore';
import { useDishStore } from '@/stores/DishStore';
import { ref, reactive } from 'vue';

const router = useRouter();
const CalculationStore = useCalculationStore();
const DishStore = useDishStore();

const debts = reactive({});

onMounted(() => {
  const calculatedDebts = CalculationStore.calculateDebts();
  Object.assign(debts, calculatedDebts);
});
</script>
