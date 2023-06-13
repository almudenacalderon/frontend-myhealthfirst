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
                                <td class="col-md-6"><v-text-field label="Nombre" type="input" v-model="nutriActual.nombre"></v-text-field>
                                </td>
                                <td class="col-md-6"><v-text-field label="PhoneNumber" type="input"
                                        v-model="nutriActual.phoneNumber"></v-text-field></td>
                            </tr>

                            <tr>
                                <td class="col-md-6"><v-text-field label="Fecha Nacimiento" type="date"
                                        v-model="nutriActual.fechaNacimiento"></v-text-field>
                                </td>
                                <td class="col-md-6"><v-text-field label="Email" type="input" v-model="nutriActual.email"></v-text-field>
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
import moment from 'moment';

const store = userStore();
const mostrarVentana2 = ref(false);
const nutriActual = ref({} as Nutricionista);
store.CargaDatosIniciales();
nutriActual.value = store.GetnutriSelecionado;
console.log(nutriActual.value)
const emit = defineEmits(['onClose']);


const editar = async (nom: string) => {

    try {

        if (nutriActual.value.email !== store.GetnutriSelecionado.email) {
            const duplicadoEmail = store.getlistaNutricionistas.find(
                (a) => a.email === nutriActual.value.email
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
            await EditarNutricionist(
                nutriActual.value.id,
                nutriActual.value.nombre,
                nutriActual.value.email,
                nutriActual.value.role,
                nutriActual.value.phoneNumber,
                nutriActual.value.fechaNacimiento);

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