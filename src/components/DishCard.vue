<template>
  <v-sheet
    color="background-light"
    class="pa-5 rounded-xl"
  >
    <v-text-field
      label="Название"
      v-model="dish.name"
    >
      <template v-slot:prepend>
        <v-icon> mdi-food-fork-drink </v-icon>
      </template>
    </v-text-field>

    <v-text-field
      type="number"
      label="Цена"
      v-model="dish.price"
    >
      <template v-slot:prepend>
        <v-icon> mdi-currency-rub </v-icon>
      </template>
    </v-text-field>

    <div class="d-flex flex-column flex-md-row ga-5 mb-5">
      <v-btn
        variant="outlined"
        class="elevation-5 py-2 font-weight-bold text-primary"
        style="flex: 0 0 50%"
        prepend-icon="mdi-wallet"
      >
        {{ dish.payer.name }}
      </v-btn>
      <v-btn
        class="elevation-3 py-2 bg-primary"
        style="flex: 1"
        @click="dialog = true"
      >
        Изменить плательщика
      </v-btn>
    </div>

    <v-expansion-panels
      bg-color="background-dark"
      variant="accordion"
      class="mb-5"
    >
      <v-expansion-panel>
        <v-expansion-panel-title class="font-weight-bold text-primary text-center">
          Отметьте тех, кто вкусил
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <div class="d-flex flex-wrap ga-5">
            <v-btn
              color="primary"
              class="align-center mt-2"
              @click="checkAllPersons"
            >
              {{ allPersonsSelected ? 'Отменить выбор' : 'Все' }}
            </v-btn>
            <div class="users__list d-flex flex-wrap ga-4">
              <v-checkbox
                v-for="person in PersonStore.persons"
                dense
                color="primary"
                v-model="selectedPersons"
                :key="person.id"
                :label="person.name"
                :value="person"
              >
              </v-checkbox>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-dialog
      width="auto"
      v-model="dialog"
    >
      <v-card class="pa-10 bg-background-light">
        <v-radio-group v-model="dish.payer">
          <p class="font-weight-bold mb-5">Выберите того, кто платил за это блюдо</p>
          <v-radio
            v-for="person in PersonStore.persons"
            :key="person.id"
            :label="person.name"
            :value="person"
          >
          </v-radio>
        </v-radio-group>
      </v-card>
    </v-dialog>

    <div class="d-flex justify-center">
      <v-btn
        class="elevation-5 bg-error"
        @click="deleteDish(dish)"
      >
        Удалить
        <v-icon class="ml-2">mdi-delete</v-icon>
      </v-btn>
    </div>
  </v-sheet>
</template>

<script setup>
import { ref, watch } from 'vue';
import { usePersonStore } from '../stores/PersonStore';
import { useDishStore } from '../stores/DishStore';

const props = defineProps({
  dish: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const PersonStore = usePersonStore();
const DishStore = useDishStore();

const dialog = ref(false);

const deleteDish = (dish) => {
  if (dish && dish.id) {
    DishStore.deleteDish(dish.id);
  }
};

const selectedPersons = ref([]);
const allPersonsSelected = ref(false);

const checkAllPersons = () => {
  selectedPersons.value = allPersonsSelected.value ? [] : [...PersonStore.persons];
};

watch(selectedPersons, (newValues) => {
  allPersonsSelected.value = newValues.length === PersonStore.persons.length ? true : false;
  DishStore.updatePersons(props.dish.id, newValues);
});
</script>
