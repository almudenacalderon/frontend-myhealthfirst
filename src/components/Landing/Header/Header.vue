<template>
    <header class="header" id="header">
        <div class="container">
            <ul class="navbar" id="lista">
                <img :src=logo width=100 height=70 alt="logo" />
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#team">Equipo</a>
                <a href="#servicios">Servicios</a>
                <a href="#contact">Contacto</a>
            </ul>
        </div>
        <div>
        </div>
    </header>

</template>

<script setup lang="ts">
import logo from '@/images/logo.png';
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,600;1,700&family=Pattaya&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  font-family: "Montserrat", sans-serif;
}
.activo {
    background-color: #000;
  }
  
  /* Seccion Header */
  header {
    background-color: #fff;
  }
  header #lista a {
    color: #32cad7;
  }
  header #lista a:hover {
    color: rgb(98, 100, 101);
  }
  header .container2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  header .logo span {
    font-family: "Pattaya", sans-serif;
    color: #32cad7;
    font-size: 30px;
  }</style>