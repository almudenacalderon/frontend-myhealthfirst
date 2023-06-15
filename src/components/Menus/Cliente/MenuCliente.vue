<template>
  <v-navigation-drawer floating v-if="store.autenticado">
    <v-list density="compact" nav class="custom-list">
      <v-list-item prepend-icon="mdi-home" title="Home" value="home" to="/micuentaC" class="custom-list-item"></v-list-item>
      <v-list-item prepend-icon="mdi-account-details" title="Perfil" value="Perfil" :active="perfilActivo"
        @click="editar()" class="custom-list-item"></v-list-item>
      <v-list-item prepend-icon="mdi-weight-lifter" title="Entrenos" value="Entrenos"
        @click="abrirRutinas()" class="custom-list-item"></v-list-item>
      <v-list-item prepend-icon="mdi-silverware-variant" title="Dietas" value="Dietas"
        @click="abrirDietas()" class="custom-list-item"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-container>
    <v-row class="text-center" v-if="!tieneEntrenador && !tieneNutricionista">
      <v-col cols="12">
        <div class="encabezado">
          <h5>
            Encuentra a tu futuro entrenador o nutricionista
          </h5>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <div class="encabezado">
      <v-btn v-if="!tieneEntrenador" class="boton mr-2" @click="showTrainers = true; showNutritionists = false">Mostrar entrenadores</v-btn>
      <v-btn v-if="!tieneNutricionista" class="boton" @click="showTrainers = false; showNutritionists = true">Mostrar nutricionistas</v-btn>
      </div>
      </v-row>
      <v-container>
      <div v-if="tieneEntrenador && tieneNutricionista" id="profesionales">
        <div class="page-container mt-15">
            <h1 class="uy"> Un momento... ya tienes asignado tanto un nutricionista como entrenador, ¡estás en las mejores manos!</h1>
          </div>
           
      </div>
    </v-container>
      <div v-if="showTrainers" class="page-container">
      <div>
            <v-text-field v-model="searchEntrenadores" label="Buscar entrenadores por nombre" solo clearable></v-text-field>
          </div>
      <v-table class="custom-table">
        <thead>
          <tr>
            <th class="font-weight-bold">Nombre</th>
            <th class="font-weight-bold">Email</th>
            <th class="font-weight-bold">Numero</th>
            <th class="font-weight-bold">Fecha Nacimiento</th>
            <th class="font-weight-bold">Profesional</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entrenador in filteredEntrenadores" :key="entrenador.id">
            <td>{{ entrenador.nombre }}</td>
            <td>{{ entrenador.email }}</td>
            <td>{{ entrenador.phoneNumber }}</td>
            <td>{{ formatFecha(entrenador.fechaNacimiento) }}</td>
            <td>{{ entrenador.role }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>

  
     <div v-if="showNutritionists" class="page-container">
      <div>
            <v-text-field v-model="searchNutricionistas" label="Buscar nutricionistas por nombre" solo clearable></v-text-field>
          </div>
      <v-table class="custom-table">
        <thead>
          <tr>
            <th class="font-weight-bold">Nombre</th>
            <th class="font-weight-bold">Email</th>
            <th class="font-weight-bold">Numero</th>
            <th class="font-weight-bold">Fecha Nacimiento</th>
            <th class="font-weight-bold">Profesional</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="nutri in filteredNutricionistas" :key="nutri.id">
            <td>{{ nutri.nombre }}</td>
            <td>{{ nutri.email }}</td>
            <td>{{ nutri.phoneNumber }}</td>
            <td>{{ formatFecha(nutri.fechaNacimiento) }}</td>
            <td>{{ nutri.role }}</td>
          </tr>
        </tbody>
      </v-table>
</div>
    
    <EditarCliente v-if="mostrarVentana" @onClose="cerrareditar()"></EditarCliente>
    <ClienteDietas v-if="clienteDietas" @onClose="cerrarDietas()"></ClienteDietas>
    <ClienteRutinas v-if="clienteRutinas" @onClose="cerrarRutinas()"></ClienteRutinas>
  </v-container>
</template>

<script setup lang="ts">
//imports
import { ref, computed } from 'vue';
import { userStore } from '../../../store/app';
import EditarCliente from './EditarCliente.vue';
import ClienteDietas from './ClienteDietas.vue';
import ClienteRutinas from './ClienteRutinas.vue';
import moment from 'moment';

//const
const store = userStore();
const mostrarVentana = ref(false);
const perfilActivo = ref(false)
store.CargaDatosIniciales();
const clienteDietas = ref(false);
const clienteRutinas = ref(false);
const searchEntrenadores = ref('');
const searchNutricionistas = ref('');
const showTrainers = ref(false);
const showNutritionists = ref(false);
const clienteActual = store.GetclienteSelecionado;

const tieneEntrenador = computed(() => clienteActual.trainerId !== null);
const tieneNutricionista = computed(() => clienteActual.nutricionistId !== null);


const editar = () => {
  mostrarVentana.value = true;
  perfilActivo.value = true;
};
const cerrareditar = () => {
  mostrarVentana.value = !mostrarVentana;
  perfilActivo.value = false;

}
const abrirDietas = () => {
  clienteDietas.value = true;

};
const cerrarDietas = () => {
  clienteDietas.value = !clienteRutinas;
}
const abrirRutinas = () => {
  clienteRutinas.value = true;

};
const cerrarRutinas = () => {
  clienteRutinas.value = !clienteRutinas;
}
const filteredEntrenadores = computed(() =>
  store.getlistaEntrenadores.filter((entrenador) =>
    entrenador.nombre.toLowerCase().includes(searchEntrenadores.value.toLowerCase())
  )
);

const filteredNutricionistas = computed(() =>
  store.getlistaNutricionistas.filter((nutricionista) =>
    nutricionista.nombre.toLowerCase().includes(searchNutricionistas.value.toLowerCase())
  )
);
const formatFecha = (fecha: any) => {
  const formattedFecha = moment(fecha).format('DD/MM/YYYY');
  return formattedFecha;
};
</script>

<style lang="scss" scoped>
.font-weight-bold{
  font-weight: 900;
}
.custom-table {
  background-color: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
  }

.custom-table table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.custom-table th {
  background-color: #e35722;
  font-weight: bolder;
}

.custom-table tr:hover {
  background-color: #eed8d1;
}
.boton {
  background-color: #000;
  color:#e35722;
}
.page-container {
  margin: 0 auto;
  text-align: center;
}
.encabezado {
  margin-bottom: 20px;
}
#profesionales {
  background-image: url(../../../images/felicidades.jpg);
  background-size: cover;
    height: 100vh;
    overflow: hidden;
    justify-content: center;
       padding: 20px;
       border-radius: 10px;
    
}
.uy {
  background-color: rgba(193, 193, 193, 0.4);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.custom-list .custom-list-item {
  border-bottom: none !important;
  color: #000;
  text-decoration: none;
}
  .custom-list-item:hover {
  background-color: #e35722 !important;
  color: #fff !important;
}
.description {
       align-items: flex-end;
       justify-content: center;
       text-align: end;
       margin: auto;
       top: 100%;
       padding: 20px;
      }

</style>