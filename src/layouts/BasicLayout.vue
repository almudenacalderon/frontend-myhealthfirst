<template>
    <div >
      <Menu />
      <div>
        <RouterView />
        <slot />
      </div>
    </div>
  

  </template>

<script setup lang="ts">
import Menu from '../components/Menus/Menu.vue'

</script>