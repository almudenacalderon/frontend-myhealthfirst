<template>
    <v-container>
      <ventana-emergente>
        <template v-slot:header>
          <h3 class="text-center mt-8 titulo">Añadir Dieta</h3>
        </template>
        <template v-slot:body>
          <v-container>
            <v-table style="padding-top: 30px;">
              <thead>
                <v-dialog v-model="nutriDietas"></v-dialog>
                <tr class="col-md-3 offset-md-3">
                  <td class="col-md-6">
                    <v-text-field label="Nombre" type="input" v-model="nuevaDieta.nombre"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="col-md-6">
                    <v-select v-model="nuevaDieta.clientId" item-title="nombre" item-value="id" :items="listaClientes" label="Cliente"></v-select>
                  </td>
                </tr>
                <tr>
                  <td class="col-md-6">
                    <v-text-field label="Comentarios" type="input" v-model="nuevaDieta.comentarios"></v-text-field>
                  </td>
                </tr>
              </thead>
            </v-table>
          </v-container>
        </template>
  
        <template v-slot:footer>
          <v-row class="row">
            <v-col cols="6" class="text-right">
              <v-btn class="ma-2" color="indigo" @click="guardarDieta()">
                <v-icon left>mdi-plus</v-icon>
                Guardar Dieta
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
  import { Diet } from "@/interfaces/IDiet";
  import { DietPost } from "@/services/dietasService";
  import { Nutricionista } from "@/interfaces/INutricionista";
  
  const store = userStore();
  store.CargaDatosIniciales();
  const emit = defineEmits(['onClose']);
  const nuevaDieta = ref({} as Diet);
  const nutriActual = ref({} as Nutricionista);
  nutriActual.value = store.GetnutriSelecionado;
  const nutriDietas = ref(false);
  const listaClientes = store.getlistaClientes.filter((cliente) => cliente.nutricionistId === nutriActual.value.id);
  
  const guardarDieta = async () => {
    if(listaClientes.length===0) {
    Swal.fire({
      icon: "error",
      title: "Error al guardar la dieta",
      text: "Para agregar una dieta tienes que tener al menos un cliente asignado.",
    });
    return;
  }
  else if (!nuevaDieta.value.nombre || !nuevaDieta.value.clientId || !nuevaDieta.value.comentarios) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos.",
      });
      return;
    }
  
    try {
      await DietPost(
        nuevaDieta.value.clientId,
        nutriActual.value.id,
        nuevaDieta.value.nombre,
        nuevaDieta.value.comentarios
      );
      Swal.fire({
        icon: "success",
        title: "Dieta creada",
        text: "La nueva dieta ha sido creada correctamente.",
      });
      store.obtenerDietas();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error al crear la dieta",
        text: "Ocurrió un error al crear la dieta. Por favor, intenta nuevamente.",
      });
    }
  };
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
  