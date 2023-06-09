<template>
  <div>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <Menu />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <RouterView />
              <slot />
            </v-col>
          </v-row>
        </v-container>
  </div>
</template>

<script setup lang="ts">
import Menu from '../components/Menus/Menu.vue'

</script>