<template>
    <v-navigation-drawer floating v-if="store.autenticado">
     <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home" title="Home" value="home" to="/"></v-list-item>
        <v-list-item
           prepend-icon="mdi-calendar-edit"
           title="Calendario"
           value="Calendario"
           to="/micalendario"
        ></v-list-item>
        <v-list-item
           prepend-icon="mdi-weight-lifter"
           title="Entrenos"
           value="Entrenos"
           to="/misentrenos"
        ></v-list-item>
        <v-list-item
           prepend-icon="mdi-file"
           title="Nutrición"
           value="Nutrición"
           to="/misdietas"
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

</style>