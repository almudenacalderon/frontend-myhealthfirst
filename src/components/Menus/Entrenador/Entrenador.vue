<template>
    <v-container class="menu-trainer">
       <v-row class="description">
          <h1> COMIENZA A CREAR TUS PROPIOS EJERCICIOS Y RUTINAS </h1>
       </v-row>
    </v-container>
 </template>
 
 <script setup lang="ts">
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