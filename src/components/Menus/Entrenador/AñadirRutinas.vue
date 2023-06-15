<template>
  <v-container>
    <ventana-emergente>
      <template v-slot:header>
        <div>
          <h3 class="text-center mt-8 titulo">Nueva Rutina</h3>
        </div>
      </template>

      <template v-slot:body>
        <v-container fluid>
          <v-table style="padding-top: 30px;">
            <thead>
              <v-dialog v-model="entrenadorRutinas"></v-dialog>
              <tr class="col-md-3 offset-md-3">
                <td class="col-md-6"><v-text-field label="Nombre" type="input"
                    v-model="rutinaActual.nombre"></v-text-field>
                </td>
                <td>
                  <v-select v-model="rutinaActual.exercises" :items="store.getlistaEjercicios" item-title="nombre"
                    item-value="id" label="Ejercicios" multiple>
                  </v-select>
                </td>
              </tr>

              <tr>
                <td class="col-md-6"><v-text-field label="comentarios" type="string"
                    v-model="rutinaActual.comentarios"></v-text-field>
                </td>
                <td>
                  <v-select multiple v-model="rutinaActual.clientId" item-title="nombre" item-value="id"
                    :items="listaClientes" label="Cliente">
                  </v-select>
                </td>

              </tr>
            </thead>
            <v-snackbar v-model="errorSnackbar" color="error">
              Por favor, complete todos los campos.
            </v-snackbar>
          </v-table>
        </v-container>
      </template>

      <template v-slot:footer>
        <div class="textField">
          <v-row class="row">
            <v-col cols="6" class="text-right">
              <v-btn class="ma-2" color="indigo" @click="validarCamposYGuardar()">
                <v-icon left>mdi-plus</v-icon>
                Guardar Rutina </v-btn>
            </v-col>
            <v-col cols="6" class="salir">
              <v-btn @click="emit('onClose')" color="error" class="ma-2">
                <v-icon icon="mdi-exit-run" />Salir
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </template>
    </ventana-emergente>
  </v-container>
</template>
  
<script setup lang="ts">
//imports
import VentanaEmergente from "@/components/VentanaEmergente.vue";
import { ref} from "vue";
import Swal from "sweetalert2";
import { userStore } from '../../../store/app';
import { Training } from '../../../interfaces/ITraining';
import { Entrenador } from "@/interfaces/IEntrenador";
import { TrainingPost } from "@/services/trainingService";

const store = userStore();
store.CargaDatosIniciales();
const entrenadorActual = ref({} as Entrenador);
entrenadorActual.value = store.GettrainerSelecionado;
const entrenadorRutinas = ref(false);
const rutinaActual = ref({} as Training);
const errorSnackbar = ref(false);
const listaClientes = store.getlistaClientes.filter((cliente) => cliente.trainerId === entrenadorActual.value.id);

const validarCamposYGuardar = () => {
  if(listaClientes.length===0) {
    Swal.fire({
      icon: "error",
      title: "Error al guardar la rutina",
      text: "Para agregar una rutina tienes que tener al menos un cliente asignado.",
    });
    return;
  }
  else if (!rutinaActual.value.nombre || rutinaActual.value.exercises.length === 0 || !rutinaActual.value.comentarios || !rutinaActual.value.clientId) {

    errorSnackbar.value = true;
    return;
  }

  guardarRutina();
};

async function guardarRutina() {
  const clientId = Number(rutinaActual.value.clientId);
  try {
    await TrainingPost(
      clientId,
      entrenadorActual.value.id,
      rutinaActual.value.exercises,
      rutinaActual.value.nombre,
      rutinaActual.value.comentarios
    );
    Swal.fire({
    icon: "success",
    title: "Nueva rutina agregada",
    text: "Tu rutina ya está hecha",
  });
    store.obtenerRutinas();
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Error al guardar la rutina",
      text: "Ocurrió un error al guardar la rutina. Por favor, intenta nuevamente.",
    });
  }

}

const emit = defineEmits(['onClose']);
</script>

<style scoped lang="scss">

.textField {
  padding-right: 50px;
  padding-left: 50px;
}

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