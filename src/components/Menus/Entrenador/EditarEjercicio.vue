<template>
    <v-container>
      <ventana-emergente>
        <template v-slot:header>
          <h3 class="text-center mt-8 titulo">Editar Ejercicio</h3>
        </template>
        <template v-slot:body>
          <v-container>
            <v-table style="padding-top: 30px;">
              <thead>
                <v-dialog v-model="editarEjer"></v-dialog>
                <tr class="col-md-3 offset-md-3">
                  <td class="col-md-6">
                    <v-text-field label="Nombre" type="input" v-model="exerciseActual.nombre"></v-text-field>
                  </td>
                  <td class="col-md-6">
                    <v-text-field label="Sets" type="input" v-model="exerciseActual.set"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="col-md-6">
                    <v-text-field label="Repeticiones" type="input" v-model="exerciseActual.repeticiones"></v-text-field>
                  </td>
                  <td class="col-md-6">
                    <v-text-field label="Comentarios" type="input" v-model="exerciseActual.comentarios"></v-text-field>
                  </td>
                </tr>
              </thead>
            </v-table>
          </v-container>
        </template>
  
        <template v-slot:footer>
          <v-row class="row">
            <v-col cols="6" class="text-right">
              <v-btn class="ma-2" color="indigo" @click="editarEj()">
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
  import { Exercise } from "@/interfaces/IExercise";
  import { EditarExercise } from "@/services/exerciseService";
  
  const store = userStore();
  store.CargaDatosIniciales();
  const emit = defineEmits(['onClose']);
  const exerciseActual = ref({} as Exercise);
  const editarEjer = ref(false);
  exerciseActual.value = store.GetEjerSelecionado;

  const editarEj = async () => {
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "Esta acción guardará los cambios en el ejercicio.",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await EditarExercise(
            exerciseActual.value.id,
            exerciseActual.value.nombre,
            exerciseActual.value.set,
            exerciseActual.value.repeticiones,
            exerciseActual.value.comentarios
          );
          return true; // Si la edición tiene éxito, se devuelve true
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error al editar el ejercicio",
            text: "Ocurrió un error al editar el ejercicio. Por favor, intenta nuevamente.",
          });
          return false; // Si hay un error en la edición, se devuelve false
        }
      },
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          icon: "success",
          title: "Ejercicio editado",
          text: "Los cambios han sido guardados correctamente.",
        });
      }
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
  