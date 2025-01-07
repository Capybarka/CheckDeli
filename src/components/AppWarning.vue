<template>
  <v-alert
    v-if="WarningStore.isWarningShow"
    class="warning position-fixed bottom-0 left-0 justify-center w-100"
    :type="warningType"
  >
    <p class="text-center text-sm-h6">{{ warningText }}</p>
  </v-alert>
</template>

<script setup>
import { useWarningStore } from '@/stores/WarningStore';
import { computed } from 'vue';

const WarningStore = useWarningStore();

const warningText = computed(() => WarningStore.warningText);
const warningType = computed(() => WarningStore.warningType);
</script>
