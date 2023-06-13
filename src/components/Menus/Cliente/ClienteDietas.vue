<template>
    <v-container>
        <ventana-emergente>
            <template v-slot:header>
                <h3 class="text-center mt-10">Mis dietas</h3>
            </template>
            <template v-slot:body>
                <v-container>
                    <v-table>
                        <thead>
                            <v-dialog v-model="clienteDietas"></v-dialog>
                            <tr>
                                <th>Nombre</th>
                                <th>Meals</th>
                                <th>Nutricionista</th>
                                <th>Comentarios</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="dieta in listaDietaFiltrada" :key="dieta.id">
                                <td>{{ dieta.nombre }}</td>
                                <td> <v-btn small @click="mostrarMeals(dieta)">
                                        Ver Meals
                                    </v-btn></td>
                                <td>{{ dieta.nutricionistaNombre }}</td>
                                <td>{{ dieta.comentarios }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-container>
               
            <template  v-if="mostrarTablaMeals">
                <v-table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Desayuno</th>
                            <th>Comida</th>
                            <th>Media Mañana</th>
                            <th>Cena</th>
                            <th>Merienda</th>
                            <th>Otros</th>
                            <th>Post Entreno</th>
                            <th>Pre Entreno</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="meal in mealsDietaActual" :key="meal.id">
                            <td>{{ meal.nombre }}</td>
                            <td>{{ meal.desayuno }}</td>
                            <td>{{ meal.comida }}</td>
                            <td>{{ meal.media_mañana }}</td>
                            <td>{{ meal.cena }}</td>
                            <td>{{ meal.merienda }}</td>
                            <td>{{ meal.otros }}</td>
                            <td>{{ meal.post_entreno }}</td>
                            <td>{{ meal.pre_entreno }}</td>
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
import { GetDiets } from '@/services/dietasService';
import { Diet } from '../../../interfaces/IDiet';
import { Meal } from '../../../interfaces/IMeal';

const store = userStore();
const search = ref('');
const clienteDietas = ref(false);
const clienteActual = ref({} as Cliente);
store.CargaDatosIniciales();
clienteActual.value = store.GetclienteSelecionado;
const mostrarTablaMeals = ref(false);
const mealsDietaActual = ref([] as Meal[]);

const emit = defineEmits(['onClose']);
const listaDietaFiltrada = computed(() => {

    return store.getlistaDietas.filter((dieta) => dieta.clientId === clienteActual.value.id)
        .map((dieta) => {
            const nutricionista = store.getlistaNutricionistas.find(
                (nutricionista) => nutricionista.id === dieta.nutricionistId
            );
            const meals = dieta.meals.map((meal) => {
                return {
                    ...meal,
                    dietId: dieta.id,
                };
            });
            return { ...dieta, nutricionistaNombre: nutricionista?.nombre, meals };
        });
});
const mostrarMeals = (dieta: Diet) => {
    mealsDietaActual.value = dieta.meals;
    mostrarTablaMeals.value = true;
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