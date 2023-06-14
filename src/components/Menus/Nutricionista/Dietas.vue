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
        <v-table class="mt-7 card">
            <thead>
                <tr class="orange-header card-header">
                    <th class="font-weight-bold">Nombre</th>
                    <th class="font-weight-bold">Comidas</th>
                    <th class="font-weight-bold">Cliente</th>
                    <th class="font-weight-bold">Comentarios</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="dieta in listaDietasFiltradas" :key="dieta.id" class="card-body">
                    <td>{{ dieta.nombre }}</td>
                    <td>
                        <v-btn class="row" variant="text" color="indigo" @click="mostrarComidas(dieta)">
                            Ver Comidas
                        </v-btn>
                    </td>
                    <td>{{ dieta.clienteNombre }}</td>
                    <td>{{ dieta.comentarios }}</td>
                    <td class="button-group"> <v-btn variant="text" color="indigo"  @click="editDietas(dieta)"
                        ><v-icon left>mdi-pencil</v-icon></v-btn>
                        <v-btn variant="text" color="red-accent-4" @click="borrarDieta(dieta)"><v-icon
                                left>mdi-delete</v-icon></v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>


        <div v-if="mostrarTablaComidas">
            <h3 class="mt-11">{{ dietaActual.nombre }} </h3>
            <div class="card">
                <div class="card-header black">
                    <div class="row">
                        <div class="col font-weight-bold">Día</div>
                        <div class="col font-weight-bold">Desayuno</div>
                        <div class="col font-weight-bold">Comida</div>
                        <div class="col font-weight-bold">Media Mañana</div>
                        <div class="col font-weight-bold">Cena</div>
                        <div class="col font-weight-bold">Merienda</div>
                        <div class="col font-weight-bold">Otros</div>
                        <div class="col font-weight-bold">Post Entreno</div>
                        <div class="col font-weight-bold">Pre Entreno</div>
                        <div class="col font-weight-bold">Comentarios</div>
                        <div class="col"></div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row" v-for="comida in comidasDietaActual" :key="comida.id">
                        <div class="col">{{ comida.nombre }}</div>
                        <div class="col">{{ comida.desayuno }}</div>
                        <div class="col">{{ comida.comida }}</div>
                        <div class="col">{{ comida.media_mañana }}</div>
                        <div class="col">{{ comida.cena }}</div>
                        <div class="col">{{ comida.merienda }}</div>
                        <div class="col">{{ comida.otros }}</div>
                        <div class="col">{{ comida.post_entreno }}</div>
                        <div class="col">{{ comida.pre_entreno }}</div>
                        <div class="col">{{ comida.comentarios }}</div>
                        <div class="button-group"><v-btn variant="text" color="indigo"
                            @click="editMeals(comida)"><v-icon
                                    left>mdi-pencil</v-icon></v-btn>
                            <v-btn variant="text" color="red-accent-4"
                            @click="borrarMeal(comida)">
                            <v-icon left>mdi-delete</v-icon></v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-container>
    <AñadirDieta v-if="nutriDietas" @onClose="closeAñadirDietas()"></AñadirDieta>
    <EditarDieta v-if="editDieta" @onClose="closeEditDieta()"></EditarDieta>
    <EditarMeal v-if="editMeal" @onClose="closeEditMeal()"></EditarMeal>

</template>
  
<script setup lang="ts">
// imports
import { computed, ref } from 'vue';
import { userStore } from '../../../store/app';
import { Nutricionista } from '@/interfaces/INutricionista';
import Swal from 'sweetalert2';
import { Diet } from '../../../interfaces/IDiet';
import { Meal } from '../../../interfaces/IMeal';
import { EliminarMeal } from '@/services/mealService';
import { EliminarDieta } from '@/services/dietasService';
import EditarDieta from './EditarDieta.vue';
import EditarMeal from './EditarMeal.vue';
import AñadirDieta from './AñadirDieta.vue';
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
const editMeal = ref(false);

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

const closeEditDieta = () => {
    editDieta.value = false;
};


const editMeals = (meal: Meal) => {
    store.setMealSelect(meal.id);
    editMeal.value = true;
};

const closeEditMeal = () => {
    editMeal.value = false;
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

const borrarMeal = async (meal: Meal) => {
    const confirmacion = await Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el meal seleccionado.",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await EliminarMeal(meal.id);
          //encontrar el indice de la comida que se eliminó y quitarla de la lista
         const index = comidasDietaActual.value.findIndex((c) => c.id === meal.id);
         if (index !== -1) {
         comidasDietaActual.value.splice(index, 1);
          }
          return true; 
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error al eliminar la alimentación diaria",
            text: "Ocurrió un error al eliminar la comida. Por favor, intenta nuevamente.",
          });
          return false;
        }
      },
    });
  
    if (confirmacion.value) {
      Swal.fire({
        icon: "success",
        title: "Alimentación diaria eliminada",
        text: "Se ha eliminado correctamente.",
      });
    }
  };
</script>
  
<style scoped>
.button-group {
    display: flex;
    align-items: center;
}

.orange-header {
    background-color: #dedbda;
}

.black {
    background-color: #FF6E40;
    color: rgb(255, 255, 255);

}

.font-weight-bold {
    font-weight: 900;
}

.row {
    align-items: center;
}

.padding {
    padding-left: 20px;
}</style>
  