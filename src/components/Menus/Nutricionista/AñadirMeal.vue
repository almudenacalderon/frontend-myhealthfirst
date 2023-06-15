<template>
    <v-container>
      <ventana-emergente>
        <template v-slot:header>
          <h3 class="text-center mt-8 titulo">Añadir Alimentación Diaria</h3>
        </template>
        <template v-slot:body>
          <v-container>
            <v-table style="padding-top: 30px;">
              <thead>
                <v-dialog v-model="nutriMeals"></v-dialog>
                <tr>
                <td class="col-md-4">
                  <v-text-field label="Día" type="input" v-model="nuevaMeal.nombre"></v-text-field>
                </td>
                <td class="col-md-4">
                  <v-select v-model="nuevaMeal.dietId" item-title="nombre" item-value="id" :items="listaDietas" label="Dieta"></v-select>
                </td>
                <td class="col-md-4">
                <v-text-field label="Desayuno" type="input" v-model="nuevaMeal.desayuno"></v-text-field>
                </td>
              </tr>
              <tr>
                <td class="col-md-4">
                    <v-text-field label="Comida" type="input" v-model="nuevaMeal.comida"></v-text-field>
                </td>
                <td class="col-md-4">
                    <v-text-field label="Merienda" type="input" v-model="nuevaMeal.merienda"></v-text-field>
                </td>
                <td class="col-md-4">
                  <v-text-field label="Media Mañana" type="input" v-model="nuevaMeal.media_mañana"></v-text-field>
                </td>
              </tr>
              <tr>
                <td class="col-md-4">
                  <v-text-field label="Cena" type="input" v-model="nuevaMeal.cena"></v-text-field>
                </td>
                <td class="col-md-4">
                    <v-text-field label="Pre-entreno" type="input" v-model="nuevaMeal.pre_entreno"></v-text-field>
                  
                </td>
                <td class="col-md-4">
                <v-text-field label="Post-entreno" type="input" v-model="nuevaMeal.post_entreno"></v-text-field>
                </td>
              </tr>
              <tr>
                <td colspan="2" class="col-md-4">
                 <v-text-field label="Comentarios" type="input" v-model="nuevaMeal.comentarios"></v-text-field>
                </td>
               
                <td class="col-md-4">
                    <v-text-field label="Otros" type="input" v-model="nuevaMeal.otros"></v-text-field>
                </td>
               
              </tr>
            </thead>
          </v-table>
        </v-container>
      </template>
  
        <template v-slot:footer>
          <v-row class="row">
            <v-col cols="6" class="text-right">
              <v-btn class="ma-2" color="indigo" @click="guardarMeal()">
                <v-icon left>mdi-plus</v-icon>
                Guardar Alimentación Diaria
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
  import { MealPost } from "@/services/mealService";
  import { Nutricionista } from "@/interfaces/INutricionista";
  import { Meal } from '../../../interfaces/IMeal';
  
  const store = userStore();
  store.CargaDatosIniciales();
  const emit = defineEmits(['onClose']);
  const nuevaMeal = ref({} as Meal);
  const nutriActual = ref({} as Nutricionista);
  nutriActual.value = store.GetnutriSelecionado;
  const nutriMeals = ref(false);
  const listaDietas = store.getlistaDietas.filter((dieta) => dieta.nutricionistId === nutriActual.value.id);
  
  const guardarMeal = async () => {
    if(listaDietas.length===0) {
    Swal.fire({
      icon: "error",
      title: "Error al guardar la alimentación diaria",
      text: "Para agregar una alimentación diaria tienes que tener dietas para poder insertar estas comidas.",
    });
    return;
  }
  else if (
    !nuevaMeal.value.nombre ||
    !nuevaMeal.value.dietId ||
    !nuevaMeal.value.comentarios ||
    !nuevaMeal.value.desayuno ||
    !nuevaMeal.value.comida ||
    !nuevaMeal.value.media_mañana ||
    !nuevaMeal.value.cena ||
    !nuevaMeal.value.merienda ||
    !nuevaMeal.value.otros ||
    !nuevaMeal.value.post_entreno ||
    !nuevaMeal.value.pre_entreno
  ) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos.",
      });
      return;
    }
  
    try {
      await MealPost(
        nuevaMeal.value.dietId,
        nuevaMeal.value.nombre,
        nuevaMeal.value.desayuno,
        nuevaMeal.value.comida,
        nuevaMeal.value.media_mañana,
        nuevaMeal.value.cena,
        nuevaMeal.value.merienda,
        nuevaMeal.value.otros,
        nuevaMeal.value.post_entreno,
        nuevaMeal.value.pre_entreno,
        nuevaMeal.value.comentarios,
      );
      Swal.fire({
        icon: "success",
        title: "Alimentación diaria creada",
        text: "La nueva alimentación diaria ha sido creada correctamente.",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error al crear la alimentación diaria",
        text: "Ocurrió un error al crear la alimentación diaria. Por favor, intenta nuevamente.",
      });
    }
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
  