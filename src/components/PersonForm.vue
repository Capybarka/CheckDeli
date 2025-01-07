<template>
  <div>
    <v-text-field
      class="add-person-input"
      label="Введите имя"
      variant="outlined"
      v-model="personName"
    >
      <template v-slot:prepend>
        <v-icon>mdi-account-check</v-icon>
      </template>
    </v-text-field>

    <v-row justify="center">
      <v-col cols="12">
        <v-btn
          block
          class="font-weight-bold bg-primary"
          @click="addPerson"
        >
          Добавить
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import { useWarningStore } from '@/stores/WarningStore';

const personName = ref('');
const emit = defineEmits(['add-person-emit']);

const WarningStore = useWarningStore();

const addPerson = () => {
  if (personName.value) {
    emit('add-person-emit', {
      id: Date.now(),
      name: personName.value,
    });
    personName.value = '';
  } else {
    WarningStore.showWarning('Введите имя!');
  }
};
</script>
