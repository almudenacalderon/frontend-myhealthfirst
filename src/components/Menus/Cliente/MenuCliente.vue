<template>
    <v-navigation-drawer floating v-if="store.autenticado">
     <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home" title="Home" value="home" to="/"></v-list-item>
        <v-list-item
           prepend-icon="mdi-calendar-edit"
           title="Calendario"
           value="Calendario"
           to="/micalendario"
        ></v-list-item>
        <v-list-item
           prepend-icon="mdi-weight-lifter"
           title="Entrenos"
           value="Entrenos"
           to="/misentrenos"
        ></v-list-item>
        <v-list-item
           prepend-icon="mdi-file"
           title="Nutrición"
           value="Nutrición"
           to="/misdietas"
        ></v-list-item>
        <v-list-item
        prepend-icon="mdi-account-details"
        title="Mi cuenta"
        value="Cuenta"
        to="/micuenta">
        </v-list-item>
          <!-- Agregar el buscador -->
        <v-text-field v-model="search" label="Buscar" solo clearable></v-text-field>
     </v-list>
  </v-navigation-drawer>

  <v-container >
    <v-row class="text-center">
      <section
        data-vc-full-width="true"
        data-vc-full-width-init="true"
        class="vc_row wpb_row vc_row-fluid vc_custom_1571902559965 vc_row-has-fill pofo-stretch-content pofo-stretch-row-container"
        style="
          position: relative;
          left: -107.4px;
          box-sizing: border-box;
          width: 965px;
          padding-left: 107.4px;
          padding-right: 107.6px;
        "
      >
        <div class="wpb_column vc_column_container vc_col-sm-12 col-xs-mobile-fullwidth">
          <div class="vc_column-inner">
            <div class="wpb_wrapper">
              <h6
                class="text-extra-dark-gray margin-20px-bottom font-weight-600 display-inline-block alt-font heading-style2 heading-3"
                style="color: #262261"
              >
                Sobre el nombre «Kiteris»
              </h6>
              <div class="last-paragraph-no-margin">
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

.ajustar {

  max-width: 1000px;
  font-size: 14px;
}
</style>