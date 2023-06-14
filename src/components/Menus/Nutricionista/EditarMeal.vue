<template>
    <v-container>
      <ventana-emergente>
        <template v-slot:header>
          <h3 class="text-center mt-8 titulo">Editar Alimentación Diaria</h3>
        </template>
        <template v-slot:body>
          <v-container>
            <v-table style="padding-top: 30px;">
              <thead>
                <v-dialog v-model="editMeal"></v-dialog>
                <tr>
                <td class="col-md-4">
                  <v-text-field label="Día" type="input" v-model="mealActual.nombre"></v-text-field>
                </td>
                <td class="col-md-4">
                  <v-select v-model="mealActual.dietId" item-title="nombre" item-value="id" :items="listaDietas" label="Dieta"></v-select>
                </td>
                <td class="col-md-4">
                <v-text-field label="Desayuno" type="input" v-model="mealActual.desayuno"></v-text-field>
                </td>
              </tr>
              <tr>
                <td class="col-md-4">
                    <v-text-field label="Comida" type="input" v-model="mealActual.comida"></v-text-field>
                </td>
                <td class="col-md-4">
                    <v-text-field label="Merienda" type="input" v-model="mealActual.merienda"></v-text-field>
                </td>
                <td class="col-md-4">
                  <v-text-field label="Media Mañana" type="input" v-model="mealActual.media_mañana"></v-text-field>
                </td>
              </tr>
              <tr>
                <td class="col-md-4">
                  <v-text-field label="Cena" type="input" v-model="mealActual.cena"></v-text-field>
                </td>
                <td class="col-md-4">
                    <v-text-field label="Pre-entreno" type="input" v-model="mealActual.pre_entreno"></v-text-field>
                  
                </td>
                <td class="col-md-4">
                <v-text-field label="Post-entreno" type="input" v-model="mealActual.post_entreno"></v-text-field>
                </td>
              </tr>
              <tr>
                <td colspan="2" class="col-md-4">
                 <v-text-field label="Comentarios" type="input" v-model="mealActual.comentarios"></v-text-field>
                </td>
               
                <td class="col-md-4">
                    <v-text-field label="Otros" type="input" v-model="mealActual.otros"></v-text-field>
                </td>
               
              </tr>
            </thead>
          </v-table>
        </v-container>
      </template>
  
        <template v-slot:footer>
          <v-row class="row">
            <v-col cols="6" class="text-right">
              <v-btn class="ma-2" color="indigo" @click="editarMeal()">
                <v-icon left>mdi-plus</v-icon>
                Editar Alimentación Diaria
              </v-btn>
            </v-col>
            <v-col cols="6" class="salir">
              <v-btn @click="emit('onClose')" color="red-accent-4" class="ma-2">
                <v-icon icon="mdi-exit-run" />Salir
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </ventana-emergente>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import VentanaEmergente from "@/components/VentanaEmergente.vue";
  import { ref } from "vue";
  import Swal from "sweetalert2";
  import { userStore } from "@/store/app";
  import { EditarMeal } from "@/services/mealService";
  import { Nutricionista } from "@/interfaces/INutricionista";
  import { Meal } from '../../../interfaces/IMeal';
  
  const store = userStore();
  store.CargaDatosIniciales();
  const emit = defineEmits(['onClose']);
  const mealActual = ref({} as Meal);
  mealActual.value = store.GetMealSelecionado;
  console.log(store.GetMealSelecionado)
  const nutriActual = ref({} as Nutricionista);
  nutriActual.value = store.GetnutriSelecionado;
  const editMeal = ref(false);
  const listaDietas = store.getlistaDietas.filter((dieta) => dieta.nutricionistId === nutriActual.value.id);
  
  const editarMeal = async () => {
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "Esta acción guardará los cambios en la alimentación diaria.",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await EditarMeal(
        mealActual.value.id,
        mealActual.value.dietId,
        mealActual.value.nombre,
        mealActual.value.desayuno,
        mealActual.value.comida,
        mealActual.value.media_mañana,
        mealActual.value.cena,
        mealActual.value.merienda,
        mealActual.value.otros,
        mealActual.value.post_entreno,
        mealActual.value.pre_entreno,
        mealActual.value.comentarios,
        );
          return true; 
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error al editar la alimentación diaria",
            text: "Ocurrió un error al editar la alimentación diaria. Por favor, intenta nuevamente.",
          });
          return false; 
        }
      },
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          icon: "success",
          title: "Alimentación diaria editada",
          text: "Los cambios han sido guardados correctamente.",
        });
      }
      store.obtenerDietas();
      store.obtenerMeals();
    });
  };
  
  </script>
  
  <style scoped>
  .row {
    align-items: center;
    padding-bottom: 80px;
  }
  .space {
    justify-content: space-between;
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
  