<template>
  <v-app app>
    <v-main>
      <AppBar />
      <v-container>
        <router-view></router-view>
        <app-warning></app-warning>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue';
import AppBar from './components/AppBar.vue';
import AppWarning from './components/AppWarning.vue';
import { usePersonStore } from './stores/PersonStore';

onMounted(() => {
  const PersonStore = usePersonStore()
  if (PersonStore.persons.length === 0) {
    PersonStore.loadPersonsFromStorage()
  }
});
</script>
