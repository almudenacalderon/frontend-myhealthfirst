<template>
    <v-container>
        <ventana-emergente>
            <template v-slot:header>
                <h3 class="text-center mt-5">Editar Perfil</h3>
            </template>
            <template v-slot:body>
                <v-container>
                    <v-table>
                        <thead>
                            <v-dialog v-model="mostrarVentana"></v-dialog>
                            <tr class="col-md-3 offset-md-3">
                                <td><v-text-field label="Nombre" type="input" v-model="clienteActual.nombre"></v-text-field>
                                </td>
                                <td><v-text-field label="PhoneNumber" type="input"
                                        v-model="clienteActual.phoneNumber"></v-text-field></td>
                                <td><v-text-field label="Email" type="input" v-model="clienteActual.email"></v-text-field>
                                </td>
                            </tr>
                            <tr>
                                <td><v-text-field label="Peso" type="input" v-model="clienteActual.peso"></v-text-field>
                                </td>
                                <td><v-text-field label="Altura" type="input" v-model="clienteActual.altura"></v-text-field>
                                </td>
                            </tr>
                            <tr>
                                <td><v-text-field label="Fecha Nacimiento" type="datetime-local"
                                        v-model="clienteActual.fechaNacimiento"></v-text-field></td>
                                <td><v-text-field label="Fecha Asignacion dieta" type="datetime-local"
                                        v-model="clienteActual.fecha_asignacion_dieta"></v-text-field></td>
                                <td><v-text-field label="Fecha Asignacion entreno" type="datetime-local"
                                        v-model="clienteActual.fecha_asignacion_entrenamiento"></v-text-field></td>
                            </tr>
                        </thead>
                    </v-table>
                </v-container>
            </template>

            <template v-slot:footer>
                <v-row class="row">
                    <v-col cols="6" class="text-right">
                        <v-btn class="ma-2" variant="tonal" @click="editar(clienteActual.email)"> Añadir </v-btn>
                    </v-col>
                    <v-col cols="6" class="salir">
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
import { ref } from 'vue';
import { userStore } from '../../../store/app';
import { Cliente } from '@/interfaces/ICliente';
import Swal from 'sweetalert2';
import { EditarCliente } from '@/services/clienteService';
import VentanaEmergente from "@/components/VentanaEmergente.vue";
import moment from 'moment';
import { ChangeEmail } from '@/services/userService';

const store = userStore();
const search = ref('');
const mostrarVentana = ref(false);
const clienteActual = ref({} as Cliente);
store.CargaDatosIniciales();
clienteActual.value = store.GetclienteSelecionado;
const emit = defineEmits(['onClose']);

const validarCamposYGuardar = () => {
    if (
        !clienteActual.value.nombre ||
        !clienteActual.value.email ||
        !clienteActual.value.phoneNumber ||
        !clienteActual.value.peso ||
        !clienteActual.value.altura ||
        !clienteActual.value.fechaNacimiento
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
                    clienteActual.value.email,
                    clienteActual.value.userId
                );

                await EditarCliente(
                    clienteActual.value.id,
                    clienteActual.value.nombre,
                    clienteActual.value.email,
                    clienteActual.value.role,
                    clienteActual.value.phoneNumber,
                    clienteActual.value.peso,
                    clienteActual.value.altura,
                    clienteActual.value.fechaNacimiento,
                    clienteActual.value.fecha_asignacion_dieta,
                    clienteActual.value.fecha_asignacion_entrenamiento,
                    clienteActual.value.trainerId,
                    clienteActual.value.nutricionistId);

                return true;

            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Duplicado",
                    text: "El correo electrónico ya está en uso o hay un fallo en los datos.",
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
        }
        store.obtenerClientes();
    });
}

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