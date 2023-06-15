<template>
    <v-container>
        <ventana-emergente>
            <template v-slot:header>
                <h3 class="text-center mt-10">Editar Perfil</h3>
            </template>
            <template v-slot:body>
                <v-container>
                    <v-table>
                        <thead>
                            <v-dialog v-model="mostrarVentana2"></v-dialog>
                            <tr class="col-md-2 offset-md-2">
                                <td class="col-md-6"><v-text-field label="Nombre" type="input"
                                        v-model="nutriActual.nombre"></v-text-field>
                                </td>
                                <td class="col-md-6"><v-text-field label="PhoneNumber" type="input"
                                        v-model="nutriActual.phoneNumber"></v-text-field></td>
                            </tr>

                            <tr>
                                <td class="col-md-6"><v-text-field label="Fecha Nacimiento" type="datetime-local"
                                        v-model="nutriActual.fechaNacimiento"></v-text-field>
                                </td>
                                <td class="col-md-6"><v-text-field label="Email" type="input"
                                        v-model="nutriActual.email"></v-text-field>
                                </td>

                            </tr>
                        </thead>
                    </v-table>
                </v-container>
            </template>

            <template v-slot:footer>
                <v-row class="row">
                    <v-col cols="6" class="text-right">
                        <v-btn class="ma-2" variant="tonal" @click="editar(nutriActual.email)"> Añadir </v-btn>
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
import { Nutricionista } from '@/interfaces/INutricionista';
import Swal from 'sweetalert2';
import { EditarNutricionist } from '@/services/nutricionistaService';
import VentanaEmergente from "@/components/VentanaEmergente.vue";
import { ChangeEmail } from '@/services/userService';

const store = userStore();
const mostrarVentana2 = ref(false);
const nutriActual = ref({} as Nutricionista);
store.CargaDatosIniciales();
nutriActual.value = store.GetnutriSelecionado;
console.log(nutriActual.value)
const emit = defineEmits(['onClose']);

const validarCamposYGuardar = () => {
    if (
        !nutriActual.value.nombre ||
        !nutriActual.value.email ||
        !nutriActual.value.phoneNumber ||
        !nutriActual.value.fechaNacimiento
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
        try {
            validarCamposYGuardar();

            await ChangeEmail(
                nutriActual.value.email,
                nutriActual.value.userId
            );
            await EditarNutricionist(
                nutriActual.value.id,
                nutriActual.value.nombre,
                nutriActual.value.email,
                nutriActual.value.role,
                nutriActual.value.phoneNumber,
                nutriActual.value.fechaNacimiento);    
        } catch (error) {
            Swal.fire({
                    icon: "error",
                    title: "Duplicado",
                    text: "El correo electrónico ya está en uso por otro nutricionista.",
                });
        }
  
    Swal.fire({
        icon: "success",
        title: "Cambios aplicados",
        text: "Tu perfil ya está actualizado",
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