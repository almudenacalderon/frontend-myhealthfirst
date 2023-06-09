<template>
    <v-navigation-drawer floating v-if="store.autenticado">
     <v-list density="compact" nav>
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
        to="/micuenta">
        </v-list-item>

     </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
//imports
import { ref } from 'vue';
import { userStore } from '../../../store/app';

//const
const store = userStore();
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
</style>