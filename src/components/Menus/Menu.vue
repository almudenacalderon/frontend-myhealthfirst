<template>
  <v-app-bar color="#e35722" :collapse="colapsado" style="height: 9vh;">

      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="colapsado = !colapsado" class="custom"></v-app-bar-nav-icon>
     </template>

     <v-spacer></v-spacer>

     <v-toolbar-title v-if="store.autenticado">
      {{ store.trainerActual ? "Bienvenid@ " + store.trainerActual : '' }}
      {{ store.clienteActual ? "Bienvenid@ " + store.clienteActual : '' }}
      {{ store.nutriActual ? "Bienvenid@ " + store.nutriActual : '' }}
   </v-toolbar-title>

     <v-btn icon class="custom" v-if="store.autenticado" @click="logout" to="/">
        <v-icon>mdi-logout</v-icon>
     </v-btn>
    
  </v-app-bar>

</template>

<script setup lang="ts">
//imports
import { ref } from 'vue';
import { userStore } from '../../store/app';

//const
const store = userStore();
const colapsado = ref(false);
const mostrarVentana = ref(false);

const cerrar = function () {
  mostrarVentana.value = !mostrarVentana.value;
  console.log();
}
const logout = async () => {
  store.logoutUsuario();
  console.log(store.usuarioAutentificado)
};
</script>

<style lang="scss" scoped>
.custom {
  border-bottom: none !important;
  color: #000;
  text-decoration: none;
}
  .custom:hover {
  background-color: #e35722 !important;
  color: #fff !important;
}
</style>