<template>
    <v-container>
        <ventana-emergente>
            <template v-slot:header>
                <h3 class="text-center mt-10">Mis Rutinas</h3>
            </template>
            <template v-slot:body>
                <v-container>
                    <v-table>
                        <thead>
                            <v-dialog v-model="clienteRutinas"></v-dialog>
                            <tr>
                                <th>Nombre</th>
                                <th>Exercises</th>
                                <th>Entrenador</th>
                                <th>Comentarios</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="rutina in listaRutinasFiltradas" :key="rutina.id">
                                <td>{{ rutina.nombre }}</td>
                                <td>
                                    <v-btn small @click="mostrarExercises(rutina)">
                                        Ver Exercises
                                    </v-btn>
                                </td>
                                <td>{{ rutina.entrenadorNombre }}</td>
                                <td>{{ rutina.comentarios }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-container>

                <template v-if="mostrarTablaExercise">
                    <v-table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Sets</th>
                                <th>Repeticiones</th>
                                <th>Comentarios</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="exercise in exerciseRutinaActual" :key="exercise.id">
                                <td>{{ exercise.nombre }}</td>
                                <td>{{ exercise.set }}</td>
                                <td>{{ exercise.repeticiones }}</td>
                                <td>{{ exercise.comentarios }}</td>
                            </tr>
                        </tbody>
                    </v-table>

                </template>
            </template>

            <template v-slot:footer>
                <v-row class="row">
                    <v-col cols="12" class="salir">
                        <v-btn @click="emit('onClose')" color="error" class="ma-2"><v-icon
                                icon="mdi-exit-run" />Salir</v-btn>
                    </v-col>
                </v-row>
            </template>

        </ventana-emergente>
    </v-container>
</template>

<script setup lang="ts">
//imports
import { computed, ref } from 'vue';
import { userStore } from '../../../store/app';
import { Cliente } from '@/interfaces/ICliente';
import Swal from 'sweetalert2';
import VentanaEmergente from "@/components/VentanaEmergente.vue";
import moment from 'moment';
import { Training } from '../../../interfaces/ITraining';
import { Exercise } from '../../../interfaces/IExercise';

const store = userStore();
const clienteRutinas = ref(false);
const clienteActual = ref({} as Cliente);
store.CargaDatosIniciales();
clienteActual.value = store.GetclienteSelecionado;
const mostrarTablaExercise = ref(false);
const exerciseRutinaActual = ref([] as Exercise[]);
const emit = defineEmits(['onClose']);
const listaRutinasFiltradas = computed(() => {

    return store.getlistaRutinas.filter((rutina) => rutina.clientId === clienteActual.value.id)
        .map((rutina) => {
            const entrenador = store.getlistaEntrenadores.find(
                (entrenador) => entrenador.id === rutina.trainerId
            );
            const ejercicios = rutina.exercises.map((ejercicio) => {
                return {
                    ...ejercicio,
                    rutinaId: rutina.id,
                };
            });
            return { ...rutina, entrenadorNombre: entrenador?.nombre, ejercicios };
        });
            
 });

 const mostrarExercises = (rutina: Training) => {
    exerciseRutinaActual.value = rutina.exercises;
    mostrarTablaExercise.value = true;
};

</script>

<style scoped>
h3 {
    padding: 15px;
}

.row {
    align-items: center;
}

.text-right {
    display: flex;
    flex-direction: column;
}

.salir {
    display: flex;
    flex-direction: column;
}

.error {
    border-color: #faa;
    background-color: #ffeded;
}
</style>