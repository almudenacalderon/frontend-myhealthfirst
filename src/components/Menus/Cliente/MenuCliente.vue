<template>
    <v-navigation-drawer floating v-if="store.autenticado">
     <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home" title="Home" value="home" to="/micuentaC"></v-list-item>
        <v-list-item
           prepend-icon="mdi-account-details"
           title="Perfil"
           value="Perfil"
           to="/miperfil"
        ></v-list-item>
        <v-list-item
           prepend-icon="mdi-weight-lifter"
           title="Entrenos"
           value="Entrenos"
           to="/misentrenos"
        ></v-list-item>
        <v-list-item
           prepend-icon="mdi-silverware-variant"
           title="Dietas"
           value="Dietas"
           to="/misdietas"
        ></v-list-item>
     </v-list>
  </v-navigation-drawer>

  <v-container >
    <v-row class="text-center">
      <section>
        <div>
          <div>
            <div>
              <h6>
               Encuentra a tu futuro entrenador o nutricionista
              </h6>
              <div>
                <v-text-field v-model="search" label="Buscar" solo clearable></v-text-field>
                <p>
                  En nuestras sesiones de búsqueda de nombre, tarea cada vez más difícil en este
                  mundo globalizado, queríamos un nombre conectado con alguna de nuestras claves
                  filosóficas. Haciendo
                  <em>research</em> en distintas fuentes (diccionarios zulús, suajili, mapuche, …),
                  dimos con una palabra que nos pareció muy adecuada, además por proporcionar un
                  referente cinéfilo reciente.
                </p>
                <p>
                  <strong>James Cameron</strong>, el aclamado director de cine (Terminator, Abbys,
                  …), encargó a un lingüista la creación de la lengua propia de los habitantes
                  azules del planeta Pandora, el Na’vi, para su premiada película
                  <strong>“Avatar”</strong>.
                </p>
                <p>
                  <strong>“Kiteris”</strong> lo derivamos de la palabra “kite’e”, que en la lengua
                  Na’vi significa “Servicio”, que enlaza perfectamente con nuestro lema
                  <strong>“Pasión por el Servicio”</strong>. Valoramos también utilizar la doble “e”
                  (“Kiteeris”), pero nos pareció poco práctico y confuso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
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
  </v-container>
</template>

<script setup lang="ts">
//imports
import { ref } from 'vue';
import { userStore } from '../../../store/app';


//const
const store = userStore();
const search= ref('');


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
</style>