<template>
  <div>
    <v-sheet
      class="add-person__title pa-4 mb-5 elevation-5 rounded-xl mt-5"
      color="background-dark"
    >
      <p class="text-primary font-weight-bold text-center">Добавьте участников</p>
    </v-sheet>

    <v-sheet
      class="persons-list pa-5 mb-10 rounded-xl elevation-5"
      color="background-dark"
    >
      <PersonForm
        class="mb-10"
        @add-person-emit="addPerson"
      />
      <empty-message v-if="PersonStore.persons.length === 0">Пока никого нет</empty-message>
      <person-card
        v-for="person in PersonStore.persons"
        class="mb-5"
        :key="person.id"
        :person="person"
      >
      </person-card>
    </v-sheet>

    <v-row justify="center">
      <v-col cols="auto">
        <v-btn
          color="primary"
          class="elevation-5 mr-5"
          @click="router.push('/')"
        >
          <v-icon>mdi-hand-pointing-left</v-icon>
          <p class="ml-5">Назад</p>
        </v-btn>
        <v-btn
          color="primary"
          class="elevation-5"
          @click="goToAddDishes"
        >
          <p class="mr-5">Далее</p>
          <v-icon>mdi-hand-pointing-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useWarningStore } from '@/stores/WarningStore';
import { usePersonStore } from '@/stores/PersonStore';
import { useRouter } from 'vue-router';
import PersonForm from '@/components/PersonForm.vue';
import PersonCard from '@/components/PersonCard.vue';
import EmptyMessage from '@/components/EmptyMessage.vue';

const WarningStore = useWarningStore();
const PersonStore = usePersonStore();

const router = useRouter();

const addPerson = (person) => PersonStore.addPerson(person);

const goToAddDishes = () => {
  if (PersonStore.persons.length < 2) {
    WarningStore.showWarning('Добавьте хотя бы 2 человека!');
  } else {
    router.push('/dishes');
  }
};
</script>

<style lang="scss" scoped>
.persons-list {
  min-height: 60vh;
}
</style>
