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
    <v-row class="text-center">
      <v-col cols="12">
        <div class="encabezado">
          <h6>
            Encuentra a tu futuro entrenador o nutricionista
          </h6>
          <div>
            <v-text-field v-model="search" label="Buscar" solo clearable></v-text-field>

          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <h2>Entrenadores</h2>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Numero</th>
            <th>Fecha Nacimiento</th>
            <th>Profesional</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entrenador in store.getlistaEntrenadores" :key="entrenador.id">
            <td>{{ entrenador.id }}</td>
            <td>{{ entrenador.nombre }}</td>
            <td>{{ entrenador.email }}</td>
            <td>{{ entrenador.phoneNumber }}</td>
            <td>{{ entrenador.fechaNacimiento }}</td>
            <td>{{ entrenador.role }}</td>
          </tr>
        </tbody>
      </table>


      <h2>Nutricionistas</h2>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Numero</th>
            <th>Fecha Nacimiento</th>
            <th>Profesional</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entrenador in store.getlistaNutricionistas" :key="entrenador.id">
            <td>{{ entrenador.id }}</td>
            <td>{{ entrenador.nombre }}</td>
            <td>{{ entrenador.email }}</td>
            <td>{{ entrenador.phoneNumber }}</td>
            <td>{{ entrenador.fechaNacimiento }}</td>
            <td>{{ entrenador.role }}</td>
          </tr>
        </tbody>
      </table>

    </v-row>
    <EditarCliente v-if="mostrarVentana" @onClose="cerrareditar()"></EditarCliente>
    <ClienteDietas v-if="clienteDietas" @onClose="cerrarDietas()"></ClienteDietas>
    <ClienteRutinas v-if="clienteRutinas" @onClose="cerrarRutinas()"></ClienteRutinas>
  </v-container>
</template>

<script setup lang="ts">
//imports
import { ref } from 'vue';
import { userStore } from '../../../store/app';
import EditarCliente from './EditarCliente.vue';
import ClienteDietas from './ClienteDietas.vue';
import ClienteRutinas from './ClienteRutinas.vue';

//const
const store = userStore();
const search = ref('');
const mostrarVentana = ref(false);
const perfilActivo = ref(false)
store.CargaDatosIniciales();
const clienteDietas = ref(false);
const clienteRutinas = ref(false);

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
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  border-collapse: collapse;

  th {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    background-color: #f2f2f2;
    font-weight: bold;
  }

  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;

  }
}

.encabezado {
  margin-bottom: 20px;
  /* Ajusta el valor según el espacio deseado */
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


</style>