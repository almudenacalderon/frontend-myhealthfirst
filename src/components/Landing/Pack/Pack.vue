<template>
     <section class="pack">
  <div class="container">
    <div class="card-deck mb-3 text-center">
      <div class="card mb-4 sombra">
        <div class="card-header">
          <h4 class="my-0 font-weight-normal">Gratis</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">$0 <small class="text-muted">/ mes</small></h1>
          <ul class="list-unstyled mt-3 mb-4">
            <li> vídeos de rutinas </li>
            <li> vídeos de recetas </li>
            <li> restaurantes y gimnasios cercanos a ti </li>
            <li class="line"> rutina de entrenamiento personal</li>
            <li class="line"> plan nutricional</li>
            <li class="line"> sorteos y descuentos </li>
          </ul>
         <button type="button" class="btn btn-lg btn-block colorboton"><span>Regístrate gratis</span></button>
        </div>
      </div>
      <div class="card mb-4 sombra">
        <div class="card-header">
          <h4 class="my-0 font-weight-normal">Básico</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">$15 <small className="text-muted">/ mes</small></h1>
          <ul class="list-unstyled mt-3 mb-4">
            <li> vídeos de rutinas </li>
            <li> vídeos de recetas </li>
            <li> restaurantes y gimnasios cercanos a ti </li>
            <li> entrenamiento personal o plan nutricional</li>
            <li> descuentos </li>
            <li class="line"> sorteos</li>
          </ul>
          <button type="button" class="btn btn-lg btn-block colorboton"><span>Suscríbete</span></button>
        </div>
      </div>
      <div class="card mb-4 sombra">
        <div class="card-header">
          <h4 class="my-0 font-weight-normal">Premium</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">$26 <small class="text-muted">/ mes</small></h1>
          <ul class="list-unstyled mt-3 mb-4">
            <li> vídeos de rutinas </li>
            <li> vídeos de recetas </li>
            <li> restaurantes y gimnasios cercanos a ti </li>
            <li> rutina de entrenamiento personal</li>
            <li> plan nutricional</li>
            <li> sorteos y descuentos</li>
          </ul>
          <button type="button" class="btn btn-lg btn-block colorboton"><span>Suscríbete</span></button>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
/* Seccion Packs */
.pack {
    padding-top: 8em;
    padding-bottom: 5em;
    background-color: #e4e4e4;
  }
  .pack .sombra {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .pack .colorboton {
    display: inline-block;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background-color: #32cad7;
    color: #000;
  }
  .pack .colorboton span {
    display: inline-block;
    position: relative;
    transition: 0.5s;
  }
  .pack .colorboton span:after {
    content: "»";
    color: #000;
    position: absolute;
    opacity: 0;
    right: -20px;
    transition: 0.5s;
  }
  .pack .colorboton:hover span {
    padding-right: 25px;
  }
  .pack .colorboton:hover span:after {
    opacity: 1;
    right: 0;
  }
  .pack hr {
    height: 7px;
    width: 60%;
    margin: auto;
    margin-top: 20px;
    background-color: #32cad7;
    border: none;
    border-radius: 50px;
  }
  .pack ul {
    text-align: left;
    padding-left: 10%;
  }
  .pack ul li {
    margin: 20px 0;
  }
  .pack ul li::before {
    content: "✔";
    margin-right: 20px;
    color: blue;
  }
  .pack ul .line::before {
    content: "✖";
    margin-right: 20px;
    color: red;
  }
</style>