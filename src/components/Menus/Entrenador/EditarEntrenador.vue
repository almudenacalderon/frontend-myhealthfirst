<template>
    <v-container>
        <ventana-emergente>
            <template v-slot:header>
                <h3 class="text-center mt-8 titulo">Editar Perfil</h3>
            </template>
            <template v-slot:body>
                <v-container>
                    <v-table style="padding-top: 30px;">
                        <thead>
                            <v-dialog v-model="mostrarVentana3"></v-dialog>
                            <tr class="col-md-3 offset-md-3">
                                <td class="col-md-6"><v-text-field label="Nombre" type="input"
                                        v-model="trainerActual.nombre"></v-text-field>
                                </td>
                                <td class="col-md-6"><v-text-field label="PhoneNumber" type="input"
                                        v-model="trainerActual.phoneNumber"></v-text-field></td>
                            </tr>

                            <tr>
                                <td class="col-md-6"><v-text-field label="Fecha Nacimiento" type="datetime-local"
                                        v-model="trainerActual.fechaNacimiento"></v-text-field>
                                </td>
                                <td class="col-md-6"><v-text-field label="Email" type="input"
                                        v-model="trainerActual.email"></v-text-field>
                                </td>

                            </tr>
                        </thead>
                    </v-table>
                </v-container>
            </template>

            <template v-slot:footer>
                <v-row class="row">
                    <v-col cols="6" class="text-right">
                        <v-btn class="ma-2" color="indigo" @click="editar(trainerActual.email)">
                            <v-icon left>mdi-plus</v-icon>
                            Añadir </v-btn>
                    </v-col>
                    <v-col cols="6" class="salir">
                        <v-btn @click="emit('onClose')" color="red-accent-4" class="ma-2"><v-icon
                                icon="mdi-exit-run" />Salir</v-btn>
                    </v-col>
                </v-row>
            </template>
        </ventana-emergente>
    </v-container>
</template>

<script setup lang="ts">
//imports
import { ref } from 'vue';
import { userStore } from '../../../store/app';
import { Entrenador } from '@/interfaces/IEntrenador';
import Swal from 'sweetalert2';
import { EditarTrainer } from '@/services/entrenadorService';
import VentanaEmergente from "@/components/VentanaEmergente.vue";
import { ChangeEmail } from '@/services/userService';

const store = userStore();
const mostrarVentana3 = ref(false);
const trainerActual = ref({} as Entrenador);
store.CargaDatosIniciales();
trainerActual.value = store.GettrainerSelecionado;
const emit = defineEmits(['onClose']);


const editar = async (nom: string) => {

    try {

        if (trainerActual.value.email !== store.GettrainerSelecionado.email) {
            const duplicadoEmail = store.getlistaEntrenadores.find(
                (a) => a.email === trainerActual.value.email
            );
            if (duplicadoEmail) {
                Swal.fire({
                    icon: "error",
                    title: "Duplicado",
                    text: "El correo electrónico ya está en uso por otro nutricionista.",
                });
            }
        }
        try {
            await EditarTrainer(
                trainerActual.value.id,
                trainerActual.value.nombre,
                trainerActual.value.email,
                trainerActual.value.role,
                trainerActual.value.phoneNumber,
                trainerActual.value.fechaNacimiento);
                
            await ChangeEmail(
                trainerActual.value.email,
                trainerActual.value.userId
            );

        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log("Problemas en el formulario")
    }
    Swal.fire({
        icon: "success",
        title: "Cambios aplicados",
        text: "Tu perfil ya está actualizado",
    });
}


</script>

<style scoped>
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