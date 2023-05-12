// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('tareas', {
  state: () => ({ //es como el data
   tareasRealizadas: '',
   tareas: [],
   listaTareas: [],
   condicion: false,
   month: 1,
  }),

  getters: { //es como el computed
    getTareasRealizadas: (state) => state.tareasRealizadas,
  },

  actions: { //es como method

    almacenar(tareas:string) {
        this.tareasRealizadas += " "+ tareas;
    },
  }
});
