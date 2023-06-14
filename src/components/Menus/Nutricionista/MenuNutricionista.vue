<template>
   <v-navigation-drawer floating v-if="store.autenticado">
      <v-list density="compact" nav class="custom-list">
         <v-list-item prepend-icon="mdi-home" title="Home" value="home" to="/micuentaN" class="custom-list-item"></v-list-item>
        <v-list-item
           prepend-icon="mdi-silverware-variant"
           title="Dieta"
           value="Dieta"
           to="/dietas"
           class="custom-list-item"
        ></v-list-item>
        <v-list-item
           prepend-icon="mdi-food-fork-drink"
           title="Alimentacion diaria"
           value="Alimentacion"
           to="/alimentacion"
           class="custom-list-item"
        ></v-list-item>
        <v-list-item
        prepend-icon="mdi-account-details"
        title="Mi cuenta"
        value="Cuenta"
        :active="perfilActivo"
      @click="editar()"
      class="custom-list-item">
         </v-list-item>
      </v-list>
   </v-navigation-drawer>
   
   <EditarNutricionista v-if="mostrarVentana2" @onClose="cerrareditar()"></EditarNutricionista>
</template>

<script setup lang="ts">
//imports
import { ref } from 'vue';
import { userStore } from '../../../store/app';
import EditarNutricionista from './EditarNutricionista.vue';

//const
const store = userStore();
const mostrarVentana2 = ref(false);
const perfilActivo = ref(false)

const editar = () => {
   mostrarVentana2.value = true;
   perfilActivo.value = true;
};
const cerrareditar = () => {
   mostrarVentana2.value = !mostrarVentana2;
   perfilActivo.value = false;
}
</script>

<style lang="scss" scoped>
.custom-list .custom-list-item {
  border-bottom: none !important;
  color: #000;
  text-decoration: none;
}
  .custom-list-item:hover {
  background-color: #e35722 !important;
  color: #fff !important;
}
</style>