<template>
    <MenuEntrenador></MenuEntrenador>
    <v-container fluid>
        <v-row>
            <h2 class="padding text-center">Lista de Ejercicios
                <v-btn color="primary" @click="openEjercicios()">Añadir Ejercicio</v-btn>
            </h2>
        </v-row>
        <v-row>
            <v-col class="mt-8" v-for="ejercicio in store.getlistaEjercicios" :key="ejercicio.id" cols="6">
                <v-card class="text-center" elevation="12" color="#d3d2d2">
                    <v-card-title>{{ ejercicio.nombre }}</v-card-title>
                    <v-card-text>
                        <ul style="list-style: none;">
                            <li>{{ ejercicio.set }} sets de {{ ejercicio.repeticiones }} repeticiones</li>
                            <li>Comentarios: {{ ejercicio.comentarios }}</li>
                        </ul>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn small color="indigo" @click="openEditarEj(ejercicio)">
                            <v-icon left>mdi-pencil</v-icon> Editar
                        </v-btn>
                        <v-btn small color="red" @click="borrarEjercicio(ejercicio)">
                            <v-icon left>mdi-delete</v-icon> Borrar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <AñadirEjercicio v-if="entrenadorEjer" @onClose="closeEjercicios()"></AñadirEjercicio>
    <EditarEjercicio v-if="editarEjer" @onClose="closeEditEj()"></EditarEjercicio>
</template>

<script setup lang="ts">
import { userStore } from '../../../store/app';
import { ref } from "vue";
import Swal from "sweetalert2";
import AñadirEjercicio from './AñadirEjercicio.vue';
import EditarEjercicio from './EditarEjercicio.vue';
import { EliminarExercise } from '@/services/exerciseService';
import { Exercise } from '@/interfaces/IExercise';
import MenuEntrenador from './MenuEntrenador.vue';

const entrenadorEjer = ref(false);
const editarEjer = ref(false);
const store = userStore();
store.CargaDatosIniciales();


const openEjercicios = () => {
    entrenadorEjer.value = true;
};
const closeEjercicios = () => {
    entrenadorEjer.value = !entrenadorEjer;
}

const openEditarEj = (ejercicio : Exercise) => {
    store.setEjerSelect(ejercicio.id)
    editarEjer.value = true;
};
const closeEditEj = () => {
    editarEjer.value = !editarEjer;
}

const borrarEjercicio = async (ejercicio: Exercise) => {
    const confirmacion = await Swal.fire({
        icon: "warning",
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el ejercicio seleccionado.",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            try {
                await EliminarExercise(ejercicio.id);
                return true; // Si la eliminación tiene éxito, se devuelve true
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Error al eliminar el ejercicio",
                    text: "Ocurrió un error al eliminar el ejercicio. Por favor, intenta nuevamente.",
                });
                return false; // Si hay un error en la eliminación, se devuelve false
            }
        },
    });

    if (confirmacion.value) {
        Swal.fire({
            icon: "success",
            title: "Ejercicio eliminado",
            text: "El ejercicio ha sido eliminado correctamente.",
        });
        store.obtenerEjercicios();
    }
};

</script>

<style scoped></style>