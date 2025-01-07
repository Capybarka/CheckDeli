import { defineStore } from 'pinia';

export const usePersonStore = defineStore('PersonStore', {
  state: () => {
    return {
      persons: [],
    };
  },

  actions: {
    loadPersonsFromStorage() {
      const storedPersons = localStorage.getItem('persons')
      if (storedPersons) {
        this.persons.push(...JSON.parse(storedPersons))
      }
    },

    addPerson(person) {
      this.persons.push(person)
      localStorage.setItem('persons', JSON.stringify(this.persons))
    },

    deletePerson(id) {
      const idx = this.persons.findIndex((user) => user.id === id)
      if (idx !== -1) {
        this.persons.splice(idx, 1)
        localStorage.setItem('persons', JSON.stringify(this.persons))
      }
    },
  },
});
