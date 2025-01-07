<template>
    <v-sheet class="pa-5 mb-10 rounded-xl elevation-10 bg-background-dark">
        <h1
            class="mb-5 text-primary text-center text-md-h2 text-sm-h3 font-weight-bold"
        >
            Чекдели
        </h1>
        <h2 class="medium-text text-center">
            Рассчитайте, кто сколько должен за обед или ужин вместе с друзьями
        </h2>
    </v-sheet>

    <div class="d-flex justify-center">
        <v-btn
            append-icon="mdi-hand-pointing-right"
            color="primary"
            @click="router.push('/persons')"
        >
            Начать
        </v-btn>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
