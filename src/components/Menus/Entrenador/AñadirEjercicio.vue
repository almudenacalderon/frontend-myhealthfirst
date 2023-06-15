<template>
    <v-container>
        <ventana-emergente>
            <template v-slot:header>
                <div>
                    <h3 class="text-center mt-8 titulo">Nuevo Ejercicio</h3>
                </div>
            </template>

            <template v-slot:body>
                <v-container fluid>
                    <v-table style="padding-top: 30px;">
                        <thead>
                            <v-dialog v-model="entrenadorEjer"></v-dialog>
                            <tr class="col-md-3 offset-md-3">
                                <td class="col-md-6">
                                    <v-text-field label="Nombre" type="input"
                                        v-model="ejercicioActual.nombre"></v-text-field>
                                </td>
                                <td>
                                    <v-text-field label="Sets" type="number" v-model="ejercicioActual.set"></v-text-field>
                                </td>
                            </tr>

                            <tr>
                                <td class="col-md-6">
                                    <v-text-field label="Repeticiones" type="number"
                                        v-model="ejercicioActual.repeticiones"></v-text-field>
                                </td>
                                <td>
                                    <v-text-field label="Comentarios" type="input"
                                        v-model="ejercicioActual.comentarios"></v-text-field>
                                </td>
                            </tr>
                        </thead>
                        <v-snackbar v-model="errorSnackbar" color="error">
                            Por favor, complete todos los campos.
                        </v-snackbar>
                    </v-table>
                </v-container>
            </template>

            <template v-slot:footer>
                <div class="textField">
                    <v-row class="row">
                        <v-col cols="6" class="text-right">
                            <v-btn class="ma-2" color="indigo" @click="validarCamposYGuardar()">
                                <v-icon left>mdi-plus</v-icon>
                                Guardar Ejercicio
                            </v-btn>
                        </v-col>
                        <v-col cols="6" class="salir">
                            <v-btn @click="emit('onClose')" color="error" class="ma-2">
                                <v-icon icon="mdi-exit-run" />Salir
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>
            </template>
        </ventana-emergente>
    </v-container>
</template>
  
<script setup lang="ts">
//imports
import VentanaEmergente from "@/components/VentanaEmergente.vue";
import { ref } from "vue";
import Swal from "sweetalert2";
import { userStore } from '../../../store/app';
import { Exercise } from "@/interfaces/IExercise";
import { ExercisePost } from "@/services/exerciseService";

const store = userStore();
store.CargaDatosIniciales();
const ejercicioActual = ref({} as Exercise);
const errorSnackbar = ref(false);
const entrenadorEjer = ref(false);

const validarCamposYGuardar = () => {
    if (
        !ejercicioActual.value.nombre ||
        !ejercicioActual.value.set ||
        !ejercicioActual.value.repeticiones ||
        !ejercicioActual.value.comentarios
    ) {
        errorSnackbar.value = true;
        return;
    }

    guardarEjercicio();
};

async function guardarEjercicio() {
    try {
        await ExercisePost(
            ejercicioActual.value.nombre,
            ejercicioActual.value.set,
            ejercicioActual.value.repeticiones,
            ejercicioActual.value.comentarios
        );

        Swal.fire({
            icon: "success",
            title: "Nuevo ejercicio agregado",
            text: "Tu ejercicio ya está creado",
        });
        store.obtenerEjercicios();
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: "error",
            title: "Error al guardar el ejercicio",
            text: "Ocurrió un error al guardar el ejercicio. Por favor, intenta nuevamente.",
        });
    }
}

const emit = defineEmits(['onClose']);
</script>
  
<style scoped lang="scss">
.textField {
    padding-right: 50px;
    padding-left: 50px;
}

.row {
    align-items: center;
    padding-bottom: 80px;
}

.text-right {
    display: flex;
    flex-direction: column;
}

.salir {
    display: flex;
    flex-direction: column;
}

.titulo {
    padding-left: 50px;
}
</style>
  