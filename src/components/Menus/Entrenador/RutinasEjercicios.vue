<template>
      <MenuEntrenador></MenuEntrenador>
        <v-container fluid>
          <v-row>
            <v-col cols="6">
              <h2 class="mb-4">Mis Rutinas:</h2>
              <v-card v-for="rutina in listaRutinasFiltrada" :key="rutina.id" class="mb-4 text-center" elevation="12" color="#d3d2d2">
                <v-card-title>{{ rutina.nombre }}</v-card-title>
                <v-card-subtitle>Cliente: {{ rutina.clienteNombre }}</v-card-subtitle>
                <v-card-text>
                  <ul style="list-style: none;">
                    <li v-for="ejercicio in rutina.ejercicios" :key="ejercicio.id" class="text-center">
                      {{ ejercicio.nombre }}
                    <v-btn icon size="x-small" color="indigo"> <v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn icon size="x-small" color="red-accent-4"> <v-icon>mdi-delete</v-icon></v-btn>
                    </li>
                  </ul>
                  <v-btn small color="black"><v-icon left>mdi-plus</v-icon>
                  Añadir Ejercicio</v-btn>
                </v-card-text>
                <v-card-actions class="justify-center">
                <v-btn small color="indigo" ><v-icon left>mdi-pencil</v-icon>
                  Editar Rutina</v-btn>
                <v-btn small color="red-accent-4"><v-icon left>mdi-delete</v-icon>
                  Borrar Rutina</v-btn>
              </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
  </template>
  
<script setup lang="ts">
import { userStore } from '../../../store/app';
import { computed, ref } from 'vue';
import Swal from 'sweetalert2';
import { Entrenador } from '../../../interfaces/IEntrenador';
import MenuEntrenador from '@/components/Menus/Entrenador/MenuEntrenador.vue';

const store = userStore();
const mostrarVentana = ref(false);
const mostrarVentana2 = ref(false);
const entrenadorActual = ref({} as Entrenador);
store.CargaDatosIniciales();
entrenadorActual.value = store.GettrainerSelecionado;

const cerrareditar = () => {
   mostrarVentana2.value = !mostrarVentana2;
   store.obtenerClientes();
}
const cerrarañadir = () => {
   mostrarVentana.value = !mostrarVentana;
   store.obtenerClientes();
}
const mostrar = () => {
   mostrarVentana.value = true;
}
const editar = async (trainerId: number) => {
   store.setTrainerSelect(trainerId);
   mostrarVentana2.value = true;
};

const listaRutinasFiltrada = computed(() => {
    return store.getlistaRutinas.filter((rutina) => rutina.trainerId === entrenadorActual.value.id)
        .map((rutina) => {
            const cliente = store.getlistaClientes.find(
                (cliente) => cliente.id === rutina.clientId
            );
            const ejercicios = rutina.exercises.map((ejercicio) => {
                return {
                    ...ejercicio,
                    rutinaId: rutina.id,
                };
            });
            return { ...rutina, clienteNombre: cliente?.nombre, ejercicios };
        });
            
 });

</script>

<style scoped>

</style>

