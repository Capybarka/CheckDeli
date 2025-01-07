<template>
    <div class="result__wrapper">
        <v-card class="pa-5 mb-5" color="background-light">
            <h2 class="align-center mb-3">Результаты</h2>
            <p class="align-center">Кто кому и сколько должен</p>
        </v-card>
        <v-card
            elevation="10"
            variant="tonal"
            class="result-content pa-4 mb-5"
        ></v-card>
        <v-row justify="center">
            <v-col cols="auto">
                <v-btn variant="outlined" color="primary"> На главную </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
// import { useNavigationStore } from '../stores/NavigationStore'

// const NavigationStore = useNavigationStore()
</script>
