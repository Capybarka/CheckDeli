<template>
  <v-sheet class="pa-5 rounded-xl bg-background-light">
    <v-text-field
      label="Название"
      v-model="localDish.name"
    >
      <template v-slot:prepend>
        <v-icon>mdi-food-fork-drink</v-icon>
      </template>
    </v-text-field>

    <v-text-field
      type="number"
      label="Цена"
      v-model="localDish.price"
    >
      <template v-slot:prepend>
        <v-icon>mdi-currency-rub</v-icon>
      </template>
    </v-text-field>

    <div class="d-flex flex-column flex-md-row ga-5 mb-5">
      <v-btn
        variant="outlined"
        class="elevation-5 py-2 font-weight-bold text-primary"
        style="flex: 0 0 50%"
        prepend-icon="mdi-wallet"
      >
        {{ localDish.payer.name }}
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
              class="align-center mt-2 bg-primary"
              @click="checkAllPersons"
            >
              {{ allPersonsSelected ? 'Отменить выбор' : 'Все' }}
            </v-btn>
            <div class="d-flex flex-wrap ga-4">
              <v-checkbox
                v-for="person in PersonStore.persons"
                dense
                color="primary"
                v-model="selectedPersons"
                :key="person.id"
                :label="person.name"
                :value="person"
              ></v-checkbox>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card class="pa-10">
        <v-radio-group v-model="localDish.payer">
          <p class="font-weight-bold mb-5">Выберите того, кто платил за это блюдо</p>
          <v-radio
            v-for="person in PersonStore.persons"
            :key="person.id"
            :label="person.name"
            :value="person"
          ></v-radio>
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
import { ref, reactive, watch } from 'vue';
import { usePersonStore } from '@/stores/PersonStore';
import { useDishStore } from '@/stores/DishStore';

const props = defineProps({
  dish: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:dish']);

// локальная копия dish
const localDish = reactive({ ...props.dish });

watch(
  () => localDish,
  (newVal) => {
    emit('update:dish', newVal);
  },
  { deep: true },
);

// слежение за изменениями в родительском пропс dish
watch(
  () => props.dish,
  (newVal) => {
    Object.assign(localDish, newVal);
  },
  { deep: true },
);

const PersonStore = usePersonStore();
const DishStore = useDishStore();

const dialog = ref(false);

const deleteDish = (dish) => {
  DishStore.deleteDish(dish.id);
};

const selectedPersons = ref([]);
const allPersonsSelected = ref(false);

const checkAllPersons = () => {
  if (allPersonsSelected.value) {
    selectedPersons.value = [];
  } else {
    selectedPersons.value = [...PersonStore.persons];
  }
};

watch(selectedPersons, (newValues) => {
  allPersonsSelected.value = newValues.length === PersonStore.persons.length ? true : false;
  DishStore.updateUsers(props.dish.id, newValues);
});
</script>
