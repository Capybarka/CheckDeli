<template>
  <div>
    <v-sheet class="pa-4 mb-5 elevation-5 rounded-xl mt-5 bg-background-light">
      <h2 class="text-primary font-weight-bold text-center">Добавьте участников</h2>
    </v-sheet>

    <v-sheet
      class="persons-list pa-5 mb-10 rounded-xl elevation-5"
      color="background-dark"
    >
      <PersonForm
        @add-person-emit="addPerson"
        class="mb-10"
      />
      <person-card
        v-for="person in PersonStore.persons"
        class="mb-5"
        :key="person.id"
        :person="person"
      ></person-card>
    </v-sheet>

    <v-row justify="center">
      <v-col cols="auto">
        <v-btn
          prepend-icon="mdi-hand-pointing-left"
          color="primary"
          @click="router.push('/')"
        >
          Назад
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          append-icon="mdi-hand-pointing-right"
          color="primary"
          @click="goToDishes"
        >
          Далеe
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { usePersonStore } from '@/stores/PersonStore';
import { useWarningStore } from '@/stores/WarningStore';
import { useRouter } from 'vue-router';
import PersonForm from '@/components/PersonForm.vue';
import PersonCard from '@/components/PersonCard.vue';

const PersonStore = usePersonStore()
const WarningStore = useWarningStore()

const router = useRouter()

const addPerson = (person) => PersonStore.addPerson(person)

const goToDishes = () => {
  if (PersonStore.persons.length < 2) {
    WarningStore.showWarning('Добавьте минимум 2-х людей!')
    return;
  }
  router.push('/dishes')
};
</script>

<style scoped>
.persons-list {
  min-height: 60vh;
}
</style>