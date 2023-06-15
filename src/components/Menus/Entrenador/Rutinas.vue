<template>
      <MenuEntrenador></MenuEntrenador>
        <v-container fluid>
          <v-row>
              <h2 class="padding text-center">Mis Rutinas
                <v-btn class="button-row" variant="elevated" color="primary" @click="openRutinas()">
                  <v-icon left>mdi-plus</v-icon> Añadir rutina
          </v-btn>
              </h2>
          </v-row>
          <v-row>
              <v-col class="mt-8" v-for="rutina in listaRutinasFiltrada" :key="rutina.id" cols="6">
              <v-card class="text-center" elevation="12" color="#d3d2d2">
                <v-card-title>{{ rutina.nombre }}</v-card-title>
                <v-card-subtitle>Cliente: {{ rutina.clienteNombre }}</v-card-subtitle>
                <v-card-text>
                  <ul style="list-style: none;">
                    <li v-for="ejercicio in rutina.ejercicios" :key="ejercicio.id" class="text-center">
                      {{ ejercicio.nombre }}
                    </li>
                  </ul>
                </v-card-text>
                <v-card-actions class="justify-center">
                <v-btn small color="indigo" @click="editRutinas(rutina)" ><v-icon left>mdi-pencil</v-icon>
                  Editar Rutina</v-btn>
                <v-btn small color="red-accent-4" @click="borrarRutina(rutina)"><v-icon left>mdi-delete</v-icon>
                  Borrar Rutina</v-btn>
              </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <AñadirRutinas v-if="entrenadorRutinas" @onClose="closeRutinas()"></AñadirRutinas>
        <EditarRutina v-if="editRutina" @onClose="closeEdit()"></EditarRutina>
  </template>
  
<script setup lang="ts">
import { userStore } from '../../../store/app';
import { computed, ref } from 'vue';
import { Entrenador } from '../../../interfaces/IEntrenador';
import MenuEntrenador from '@/components/Menus/Entrenador/MenuEntrenador.vue';
import AñadirRutinas from './AñadirRutinas.vue';
import { EliminarEntreno } from '@/services/trainingService';
import Swal from 'sweetalert2';
import { Training } from '../../../interfaces/ITraining';
import EditarRutina from './EditarRutina.vue';

const store = userStore();
const entrenadorActual = ref({} as Entrenador);
store.CargaDatosIniciales();
entrenadorActual.value = store.GettrainerSelecionado;
const entrenadorRutinas = ref(false);
const editRutina = ref(false);

const openRutinas = () => {
   entrenadorRutinas.value = true;
};
const closeRutinas = () => {
   entrenadorRutinas.value = !entrenadorRutinas;
}
const editRutinas = (rutina: Training) => {
  store.setRutinaSelect(rutina.id)
  editRutina.value = true;
};
const closeEdit = () => {
  editRutina.value = !editRutina;
}
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

 const borrarRutina = async (rutina: Training) => {
  const confirmacion = await Swal.fire({
    icon: "warning",
    title: "¿Estás seguro?",
    text: "Esta acción eliminará la rutina seleccionada.",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      try {
        await EliminarEntreno(rutina.id);
        return true; // Si la eliminación tiene éxito, se devuelve true
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error al eliminar la rutina",
          text: "Ocurrió un error al eliminar la rutina. Por favor, intenta nuevamente.",
        });
        return false; // Si hay un error en la eliminación, se devuelve false
      }
    },
  });

  if (confirmacion.value) {
    Swal.fire({
      icon: "success",
      title: "Rutina eliminada",
      text: "La rutina ha sido eliminada correctamente.",
    });
    store.obtenerRutinas();
  }
};

</script>

<style scoped>
.padding {
  padding-left: 20px;
}
.button-row {
  margin-left: 10px;
}

</style>

