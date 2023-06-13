<template>
    <header class="header" id="header">
        <div class="container">
            <ul class="navbar" id="lista">
                <img :src=logo width=100 height=70 alt="logo" />
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#team">Profesionales</a>
                <a href="#servicios">Servicios</a>
                <a href="#contact">Contacto</a>
            </ul>
        </div>
        <div>
        </div>
    </header>

</template>

<script setup lang="ts">
import logo from '@/images/apple-touch-icon.png';
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
    background-color: #e35722;
    height: 12vh;

  }
  header #lista a {
    color:black;
  }
  header #lista a:hover {
    color: white;
    text-decoration: none;
  }
  header .container2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  header .logo span {
    font-family: "Pattaya", sans-serif;
    color: #e35722;
    font-size: 30px;
  }</style>