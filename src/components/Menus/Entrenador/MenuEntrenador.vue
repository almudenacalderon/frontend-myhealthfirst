<template>
   <v-navigation-drawer floating v-if="store.autenticado">
      <v-list density="compact" nav class="custom-list">
         <v-list-item prepend-icon="mdi-home" title="Home" value="home" to="/micuentaE"  class="custom-list-item"></v-list-item>
        <v-list-item
           prepend-icon="mdi-weight-lifter"
           title="Rutinas"
           value="Rutinas"
           to="/misrutinas"
           class="custom-list-item"
        ></v-list-item>
        <v-list-item
           prepend-icon="mdi-dumbbell"
           title="Ejercicios"
           value="Ejercicios"
           to="/ejercicios"
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

   <EditarEntrenador v-if="mostrarVentana3" @onClose="cerrareditar()"></EditarEntrenador>
</template>

<script setup lang="ts">
//imports
import { ref } from 'vue';
import { userStore } from '../../../store/app';
import EditarEntrenador from './EditarEntrenador.vue';

//const
const store = userStore();
const mostrarVentana3 = ref(false);
const perfilActivo = ref(false)


const editar = () => {
   mostrarVentana3.value = true;
   perfilActivo.value = true;
};
const cerrareditar = () => {
   mostrarVentana3.value = !mostrarVentana3;
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

.menu-trainer {
   background-image: url(../../../images/menu-trainer.jpg);
   background-size: cover;
   height: 100vh;
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