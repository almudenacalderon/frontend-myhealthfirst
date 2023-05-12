<template>
   
 <section class="about" id="about">
  <div class="container">
    <h1 class="text-center">About</h1>
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-12">
        <img class="img-fluid" :src="foto" />
      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 desc">
        <h3>Fit Challenge</h3>
        <p class="text-justify">
          En FitChallenge apostamos por la salud, por ello ofrecemos fitness para todos
          cuando y donde sea, mediante el deporte o la alimentación, tú eliges. Somos una pequeña 
          empresa, creada por un grupo de estudiantes con el fin de mejorar y facilitar la vida
          a aquellas personas que no encuentran el tiempo o el lugar indicado. Esta web será una joya
          para aquellos que se preocupen por el deporte y la salud.
        </p>
      </div>
    </div>
  </div>
</section>
    
</template>

<script setup lang="ts">
import foto from '@/images/class2.png';
</script>

<style lang="scss" scoped>
.about {
    margin: 4em 0;
    position: relative;
  }
  .about h1 {
    color: #32cad7;
    margin: 2em;
    font-weight: bold;
  }
  .about span {
    display: block;
    color: #000;
    position: absolute;
    left: 115px;
  }
  .about .desc {
    padding: 2em;
    border-left: 4px solid #32cad7;
  }
  .about .desc h3 {
    color: #32cad7;
  }
  .about .desc p {
    line-height: 2;
    color: #000;
  }
</style>