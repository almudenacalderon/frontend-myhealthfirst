<template>
    <MenuNutricionista/>
    <v-container fluid>
      <v-row>
        <h2 class="padding text-center">Mis Meals
          <v-btn class="button-row" variant="elevated" color="primary" @click="añadirMeals()">
            <v-icon left>mdi-plus</v-icon> Añadir meal
          </v-btn>
        </h2>
      </v-row>
      <v-row>
        <v-col class="mt-8" v-for="meal in listaMealsFiltrada" :key="meal.id" cols="6">
          <v-card class="text-center" elevation="12" color="#d3d2d2">
            <v-card-title>{{ meal.nombre }}</v-card-title>
            <v-card-subtitle>Dieta: {{ meal.dietaId }}</v-card-subtitle>
            <v-card-text>
              <ul style="list-style: none;">
                <li>{{ meal.desayuno }}</li>
                <li>{{ meal.comida }}</li>
                <li>{{ meal.media_mañana }}</li>
                <li>{{ meal.cena }}</li>
                <li>{{ meal.merienda }}</li>
                <li>{{ meal.otros }}</li>
                <li>{{ meal.post_entreno }}</li>
                <li>{{ meal.pre_entreno }}</li>
                <li>{{ meal.comentarios }}</li>
              </ul>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn small color="indigo" @click="editMeals(meal)"><v-icon left>mdi-pencil</v-icon>
                Editar Meal</v-btn>
              <v-btn small color="red-accent-4" @click="borrarMeal(meal)"><v-icon left>mdi-delete</v-icon>
                Borrar Meal</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { userStore } from '../../../store/app';
  import { computed, ref } from 'vue';
  import { EliminarMeal } from '@/services/mealService';
  import Swal from 'sweetalert2';
  import { Meal } from '../../../interfaces/IMeal';
  import { Nutricionista } from '../../../interfaces/INutricionista';
  import MenuNutricionista from '@/components/Menus/Nutricionista/MenuNutricionista.vue';
  
  const store = userStore();
  const nutriActual = ref({} as Nutricionista);
  store.CargaDatosIniciales();
  nutriActual.value = store.GetnutriSelecionado;
  const nutriMeals = ref(false);
  const editMeal = ref(false);
  
  const añadirMeals = () => {
    nutriMeals.value = true;
  };
  
  const closeAñadirMeals = () => {
    nutriMeals.value = false;
  };
  
  const editMeals = (meal: Meal) => {
    store.setMealSelect(meal.id);
    editMeal.value = true;
  };
  
  const closeEdit = () => {
    editMeal.value = false;
  };
  
  const listaMealsFiltrada = computed(() => {
  return store.getlistaMeals
    .filter((meal) => {
      const dieta = store.getlistaDietas.find((dieta) => dieta.id === meal.dietId);
      return dieta && dieta.nutricionistId === nutriActual.value.id;
    })
    .map((meal) => {
      const dieta = store.getlistaDietas.find((dieta) => dieta.id === meal.dietId);
      return { ...meal, dietaId: dieta?.nombre };
    });
});

  
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
          return true; // Si la eliminación tiene éxito, se devuelve true
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error al eliminar el meal",
            text: "Ocurrió un error al eliminar el meal. Por favor, intenta nuevamente.",
          });
          return false; // Si hay un error en la eliminación, se devuelve false
        }
      },
    });
  
    if (confirmacion.value) {
      Swal.fire({
        icon: "success",
        title: "Meal eliminado",
        text: "El meal ha sido eliminado correctamente.",
      });
      store.obtenerMeals();
    }
  };
  </script>
  
  <style scoped>
  .padding {
    padding-left: 20px;
  }
  .button-row {
    margin-left: 10px;
  }
  </style>
  