<template>
    <div class="home" id="home">
  <div class="container">
    <div class="row">
      <div class="description">
        <h1>Bienvenido</h1>
        <p class="text-justify">
          En FitChallenge apostamos por la salud, por ello ofrecemos fitness para todos
          cuando y donde sea, mediante el deporte o la alimentación. ¿Te atreves a cambiar tu vida?
        </p>
         <router-link :to="{ name: 'Register'}">¿No tienes cuenta?</router-link>   
         <router-link :to="{ name: 'Login'}">¿Ya tienes cuenta?</router-link>  
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
/* Seccion Home */
.home {
    background-image: url(../../../images/home.jpg);
    background-size: cover;
    height: 100vh;
    /*100vh es 100% de la pantalla del usuario*/
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    color: #fff;
  }
  .home .description {
    top: 30%;
    margin: auto;
    padding: 2em;
  }
  .home .description h1 {
    color: #32cad7;
    font-weight: bold;
  }
  .home .description p {
    color: #fff;
    font-size: 17px;
    width: 50%;
    line-height: 1.5;
  }
  .home .description button {
    border: 1px solid #32cad7;
    background: #32cad7;
    color: #000;
  }
</style>