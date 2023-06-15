<template>
    <div class="home" id="home">
  <div class="container">
    <div class="row">
      <div class="description">
        <h1>Bienvenid@</h1>
        <p class="text-justify">
          En My Health First apostamos por la salud, por ello ofrecemos a los mejores profesionales de 
          la nutrición y el entrenamiento para llevarlo a cabo. ¿Te atreves a cambiar tu vida?
        </p>
         <router-link to="/register" class="router-link">¿No tienes cuenta?</router-link>   
         <router-link to="/login" class="router-link">¿Ya tienes cuenta?</router-link>  
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
    color: #e35722;
    font-weight: bold;
  }
  .home .description p {
    color: #fff;
    font-size: 17px;
    width: 50%;
    line-height: 1.5;
  }
  .router-link {
  color: #e35722;
  text-decoration: none;
  font-size: 25px;
}

.router-link:hover {
  color: #e08778;
}
</style>