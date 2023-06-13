<template>
   <v-navigation-drawer floating v-if="store.autenticado">
      <v-list density="compact" nav class="custom-list">
         <v-list-item prepend-icon="mdi-home" title="Home" value="home" to="/micuentaN"></v-list-item>
        <v-list-item
           prepend-icon="mdi-silverware-variant"
           title="Dieta"
           value="Dieta"
           to="/dietas"
        ></v-list-item>
        <v-list-item
           prepend-icon="mdi-food-fork-drink"
           title="Alimentacion diaria"
           value="Alimentacion diaria"
           to="/alimentacion"
        ></v-list-item>
        <v-list-item
           prepend-icon="mdi-clipboard-account"
           title="Clientes"
           value="Clientes"
           to="/clientes"
        ></v-list-item>
        <v-list-item
        prepend-icon="mdi-account-details"
        title="Mi cuenta"
        value="Cuenta"
        :active="perfilActivo"
      @click="editar()">
         </v-list-item>
      </v-list>
   </v-navigation-drawer>
   <v-container class="menu-nutri">
      <v-row class="description">
         <h1> COMIENZA A CREAR TUS PROPIAS DIETAS Y MENUS DIARIOS </h1>
      </v-row>
   </v-container>
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
.table {
   width: 100%;
   border-collapse: collapse;

   th {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
      background-color: #f2f2f2;
      font-weight: bold;
   }

   td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;

   }
}

.menu-nutri {
   background-image: url(../../../images/menu-nutri.jpg);
   background-size: cover;
   height: 100vh;
   /*100vh es 100% de la pantalla del usuario*/
   overflow: hidden;
   display: flex;
   align-items: center;
   justify-content: center;


   .description {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin: auto;
      top: 30%;
      background-color: rgba(193, 193, 193, 0.4);
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

      h1 {
         color: #e35722;
         font-weight: bolder;
         text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }
   }
}
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