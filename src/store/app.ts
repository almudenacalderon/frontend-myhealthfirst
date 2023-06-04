// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('auth', {
  state: () => ({ //es como el data
   idToken: null,
   refreshToken: null,
   status: "authenticating",
   user: null,
  }),

  getters: { //es como el computed
    
  },

  actions: { //es como method

    
  }
});
