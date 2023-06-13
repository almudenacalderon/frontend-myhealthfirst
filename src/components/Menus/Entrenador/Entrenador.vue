<template>
    <v-container class="menu-trainer">
       <v-row class="description">
          <h1> COMIENZA A CREAR TUS PROPIOS EJERCICIOS Y RUTINAS </h1>
       </v-row>
    </v-container>
 </template>
 
 <script setup lang="ts">
 //imports
 import { ref } from 'vue';
 import { userStore } from '../../../store/app';

 import RutinasEjercicios from './RutinasEjercicios.vue';

 //const
 const store = userStore();
 const mostrarVentana3 = ref(false);
 const perfilActivo = ref(false)
 const entrenadorEjer = ref(false);
 const entrenadorRutinas = ref(false);
 
 const editar = () => {
    mostrarVentana3.value = true;
    perfilActivo.value = true;
 };
 const cerrareditar = () => {
    mostrarVentana3.value = !mostrarVentana3;
    perfilActivo.value = false;
 }
 const openRutinas = () => {
    entrenadorRutinas.value = true;
 };
 const closeRutinas = () => {
    entrenadorRutinas.value = !entrenadorRutinas;
 }
 const openEjercicios = () => {
    entrenadorEjer.value = true;
 
 };
 const closeEjercicios = () => {
    entrenadorEjer.value = !entrenadorEjer;
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
 
 .menu-trainer {
    background-image: url(../../../images/menu-trainer.jpg);
    background-size: cover;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
 
    .description {
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
       text-align: center;
       margin: auto;
       top: 30%;
       background-color: rgba(193, 193, 193, 0.4);
       padding: 20px;
       border-radius: 10px;
       box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
 
       h1 {
          color: #e35722;
          font-weight: bolder;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
       }
    }
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