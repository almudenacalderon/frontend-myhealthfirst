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

const validarCamposYGuardar = () => {
    if (
        !trainerActual.value.nombre ||
        !trainerActual.value.email ||
        !trainerActual.value.phoneNumber ||
        !trainerActual.value.fechaNacimiento
    ) {
        Swal.fire({
            icon: "error",
            title: "Campos incompletos",
            text: "Por favor, completa todos los campos requeridos.",
        });
        return;
    }
};

const editar = async (nom: string) => {
    Swal.fire({
        icon: "warning",
        title: "¿Estás seguro?",
        text: "Esta acción guardará los cambios en tu perfil.",
        showCancelButton: true,
        confirmButtonText: "Sí, guardar",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
        try {
            validarCamposYGuardar();
            
            await ChangeEmail(
                trainerActual.value.email,
                trainerActual.value.userId
            );
            await EditarTrainer(
                trainerActual.value.id,
                trainerActual.value.nombre,
                trainerActual.value.email,
                trainerActual.value.role,
                trainerActual.value.phoneNumber,
                trainerActual.value.fechaNacimiento);

                return true;

        } catch (error) {
            Swal.fire({
                    icon: "error",
                    title: "Duplicado",
                    text: "El correo electrónico ya está en uso por otro entrenador o hay un fallo en los datos.",
                });
                return false;
            }
        },
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                icon: "success",
                title: "Cambios aplicados",
                text: "Tu perfil ya está actualizado",
            });
            store.obtenerEntrenadores();
        }
        
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