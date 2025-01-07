<template>
  <div>
    <v-card
      class="person-card px-5 py-3 rounded-xl elevation-5"
      variant="tonal"
    >
      <div class="d-flex align-center justify-space-between">
        <v-card-title>{{ person.name }}</v-card-title>
        <v-icon
          class="d-block mb-1"
          size="large"
          color="red"
          @click="PersonStore.deletePerson(person.id)"
        >
          mdi-delete
        </v-icon>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { usePersonStore } from '@/stores/PersonStore';

const PersonStore = usePersonStore();

defineProps({
  person: {
    type: Object,
    required: true,
  },
});
</script>
