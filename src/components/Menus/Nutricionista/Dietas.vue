<template>
    <MenuNutricionista />
    <v-container fluid>
        <v-row>
            <h2 class="padding text-center">Mis Dietas
                <v-btn class="button-row" variant="elevated" color="primary" @click="añadirDietas()">
                    <v-icon left>mdi-plus</v-icon> Añadir Dieta
                </v-btn>
            </h2>
        </v-row>
        <v-table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Comidas</th>
                    <th>Cliente</th>
                    <th>Comentarios</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="dieta in listaDietasFiltradas" :key="dieta.id">
                    <td>{{ dieta.nombre }}</td>
                    <td>
                        <v-btn small @click="mostrarComidas(dieta)">
                            Ver Comidas
                        </v-btn>
                    </td>
                    <td>{{ dieta.clienteNombre }}</td>
                    <td>{{ dieta.comentarios }}</td>
                </tr>
            </tbody>
        </v-table>


        <div v-if="mostrarTablaComidas">
            <h3>{{ dietaActual.nombre }}</h3>
            <v-table>
                <thead>
                    <tr>
                        <th>Día Semana</th>
                        <th>Desayuno</th>
                        <th>Comida</th>
                        <th>Media Mañana</th>
                        <th>Cena</th>
                        <th>Merienda</th>
                        <th>Otros</th>
                        <th>Post Entreno</th>
                        <th>Pre Entreno</th>
                        <th>Comentarios</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="comida in comidasDietaActual" :key="comida.id">
                        <td> {{ comida.nombre }}</td>
                        <td>{{ comida.desayuno }}</td>
                        <td>{{ comida.comida }}</td>
                        <td>{{ comida.media_mañana }}</td>
                        <td>{{ comida.cena }}</td>
                        <td>{{ comida.merienda }}</td>
                        <td>{{ comida.otros }}</td>
                        <td>{{ comida.post_entreno }}</td>
                        <td>{{ comida.pre_entreno }}</td>
                        <td>{{ comida.comentarios }}</td>
                    </tr>
                </tbody>
            </v-table>
        </div>

        <div>
            <v-row class="row">
                <v-col cols="12" class="salir">
                    <v-btn @click="emit('onClose')" color="error" class="ma-2"><v-icon icon="mdi-exit-run" />Salir</v-btn>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>
  
<script setup lang="ts">
// imports
import { computed, ref } from 'vue';
import { userStore } from '../../../store/app';
import { Nutricionista } from '@/interfaces/INutricionista';
import Swal from 'sweetalert2';
import { Diet } from '../../../interfaces/IDiet';
import { Meal } from '../../../interfaces/IMeal';
import { EliminarDieta } from '@/services/dietasService';
import MenuNutricionista from '@/components/Menus/Nutricionista/MenuNutricionista.vue';

const store = userStore();
const nutriDietas = ref(false);
const nutriActual = ref({} as Nutricionista);
store.CargaDatosIniciales();
nutriActual.value = store.GetnutriSelecionado;
const mostrarTablaComidas = ref(false);
const comidasDietaActual = ref([] as Meal[]);
const dietaActual = ref({} as Diet);
const emit = defineEmits(['onClose']);
const editDieta = ref(false);

const añadirDietas = () => {
    nutriDietas.value = true;
};

const closeAñadirDietas = () => {
    nutriDietas.value = false;
};

const editDietas = (dieta: Diet) => {
    store.setDietaSelect(dieta.id);
    editDieta.value = true;
};

const closeEdit = () => {
    editDieta.value = false;
};

const listaDietasFiltradas = computed(() => {
    return store.getlistaDietas
        .filter((dieta) => dieta.nutricionistId === nutriActual.value.id)
        .map((dieta) => {
            const cliente = store.getlistaClientes.find(
                (cliente) => cliente.id === dieta.clientId
            );
            const comidas = dieta.meals.map((comida) => {
                return {
                    ...comida,
                    dietaId: dieta.id,
                };
            });
            return { ...dieta, clienteNombre: cliente?.nombre, comidas };
        });
});

const mostrarComidas = (dieta: Diet) => {
    comidasDietaActual.value = dieta.meals;
    dietaActual.value = dieta;
    mostrarTablaComidas.value = true;
};
const borrarDieta = async (dieta: Diet) => {
    const confirmacion = await Swal.fire({
        icon: "warning",
        title: "¿Estás seguro?",
        text: "Esta acción eliminará la dieta seleccionada.",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            try {
                await EliminarDieta(dieta.id);
                return true; // Si la eliminación tiene éxito, se devuelve true
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Error al eliminar la dieta",
                    text: "Ocurrió un error al eliminar la dieta. Por favor, intenta nuevamente.",
                });
                return false; // Si hay un error en la eliminación, se devuelve false
            }
        },
    });

    if (confirmacion.value) {
        Swal.fire({
            icon: "success",
            title: "Dieta eliminada",
            text: "La dieta ha sido eliminada correctamente.",
        });
        store.obtenerDietas();
    }
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
  