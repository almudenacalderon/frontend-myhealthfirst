<template>
    <v-container>
      <ventana-emergente>
        <template v-slot:header>
          <h3 class="text-center mt-8 titulo">Editar Dieta</h3>
        </template>
        <template v-slot:body>
          <v-container>
            <v-table style="padding-top: 30px;">
              <thead>
                <v-dialog v-model="editDieta"></v-dialog>
                <tr class="col-md-3 offset-md-3">
                  <td class="col-md-6">
                    <v-text-field label="Nombre" type="input" v-model="dietaActual.nombre"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="col-md-6">
                    <v-select v-model="dietaActual.clientId"
                     item-title="nombre" item-value="id" :items="listaClientes" label="Cliente"></v-select>
                  </td>
                </tr>
                <tr>
                  <td class="col-md-6">
                    <v-text-field label="Comentarios" type="input" v-model="dietaActual.comentarios"></v-text-field>
                  </td>
                </tr>
              </thead>
            </v-table>
          </v-container>
        </template>
  
        <template v-slot:footer>
          <v-row class="row">
            <v-col cols="6" class="text-right">
              <v-btn class="ma-2" color="indigo" @click="editarDieta()">
                <v-icon left>mdi-pencil</v-icon>
                Guardar Cambios
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
  import { EditarDieta } from "@/services/dietasService";
  import { Nutricionista } from "@/interfaces/INutricionista";
  
  const store = userStore();
  store.CargaDatosIniciales();
  const emit = defineEmits(['onClose']);
  const dietaActual = ref({} as Diet);
  const editDieta = ref(false);
  dietaActual.value = store.GetDietaSelecionado;
  const nutriActual = ref({} as Nutricionista);
  nutriActual.value = store.GetnutriSelecionado;
  const listaClientes = store.getlistaClientes.filter((cliente) => cliente.nutricionistId === nutriActual.value.id);
  
  const editarDieta = async () => {
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "Esta acción guardará los cambios en la dieta.",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await EditarDieta(
            dietaActual.value.clientId,
            dietaActual.value.id,
            dietaActual.value.nombre,
            dietaActual.value.comentarios
          );
          return true; 
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error al editar la dieta",
            text: "Ocurrió un error al editar la dieta. Por favor, intenta nuevamente.",
          });
          return false; 
        }
      },
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          icon: "success",
          title: "Dieta editada",
          text: "Los cambios han sido guardados correctamente.",
        });
      }
      store.obtenerDietas();
    });
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
  