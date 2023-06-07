<template>
    <Header></Header>
    <Home></Home>
    <About></About>
    <Team></Team>
    <Projects></Projects>
    <Pack></Pack>
    <Contacto></Contacto>
    <Footer></Footer>
   
</template>

<script setup lang="ts">
import Header from './Header/Header.vue';
import Home from './Home/Home.vue';
import About from './About/About.vue';
import Team from './Team/Team.vue';
import Footer from './Footer/Footer.vue';
import Contacto from './Contacto/Contacto.vue';
import Pack from './Pack/Pack.vue';
import Projects from './Projects/Projects.vue';
import { onBeforeMount, ref } from 'vue';
import { userStore } from '../../store/app';

const store = userStore();

onBeforeMount(async () => {
      // Llamar a las acciones para obtener los datos
      await Promise.all([
    store.obtenerClientes(),
    store.obtenerEntrenadores(),
    store.obtenerNutricionistas(),
  ]);
    });
</script>

<style lang="scss" scoped>
</style>