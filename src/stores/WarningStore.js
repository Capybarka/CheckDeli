import { defineStore } from 'pinia';

export const useWarningStore = defineStore('WarningStore', {
  state: () => {
    return {
      isWarningShow: false,
      warningText: '',
      warningType: '',
    };
  },

  actions: {
    showWarning(text, type = 'warning') {
      this.warningText = text;
      this.warningType = type;

      this.isWarningShow = true;

      setTimeout(() => {
        this.isWarningShow = false;
      }, 3000);
    },
  },
});
