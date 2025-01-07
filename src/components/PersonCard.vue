<template>
  <div>
    <v-card
      class="person-card px-5 py-3 rounded-xl elevation-5"
      variant="tonal"
    >
      <v-card-title class="d-flex justify-space-between">
        <p>{{ person.name }}</p>
        <v-icon
          class="d-block mb-1 text-red"
          size="large"
          @click="PersonStore.deletePerson(person.id)"
        >
          mdi-delete
        </v-icon>
      </v-card-title>
    </v-card>
  </div>
</template>

<script setup>
import { usePersonStore } from '../stores/PersonStore';

const PersonStore = usePersonStore();

defineProps({
  person: {
    type: Object,
    required: true,
  },
});
</script>
