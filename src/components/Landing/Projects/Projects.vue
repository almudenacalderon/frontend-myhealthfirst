<template>
    <section class="servicios" id="servicios">
  <div class="container">
    <h1 class="text-center">Te ofrecemos</h1>
    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">Entrenamiento en línea</h2>
        <h4>Entrenadores con experiencia certificada</h4>
        <p class="lead">La mayoría de los servicios de entrenamiento en línea
         (y la mayoría de los expertos en fitness) utilizan plantillas genéricas de ejercicios y dietas. 
         Es decir, el mismo programa para todos, independientemente de la edad, la experiencia o los objetivos.
          Pero en FitChallenge todo, desde el plan de nutrición hasta el programa de ejercicios, 
          se adapta al horario, estilo de vida y preferencias personales de nuestros clientes.
        </p>
      </div>
      <div class="col-md-5">
        <img class="featurette-image img-fluid rounded mx-auto servicio" :src=s1 alt="servicio1" />
      </div>
    </div>
    <div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading">Planes de alimentación</h2>
        <h4>Proporcionados por un Nutricionista</h4>
        <p class="lead">No importa si tu objetivo es ganar masa, perder peso o simplemente mantenerte sano,
          el entrenamiento es sólo una parte del plan. Para obtener los mejores resultados para tu cuerpo,
          combina tu régimen de entrenamiento con planes de comidas que potencien tus entrenamientos más duros
          y te acerquen a tus objetivos personales.</p>
      </div>
      <div class="col-md-5 order-md-1">
        <img class="featurette-image img-fluid rounded mx-auto servicio" :src=s2 alt="servicio2" />
      </div>
    </div>
  </div>
</section>
</template>

<script setup lang="ts">
import s1 from '@/images/servicio1.jpg';
import s2 from '@/images/servicio2.jpg';
</script>

<style lang="scss" scoped>
/* Seccion Servicios */
.servicios {
    padding-top: 5em;
  }
  .servicios h1 {
    color: #32cad7;
    font-weight: bold;
    padding-bottom: 2em;
  }
  .servicios h2 {
    color: #32cad7;
  }
  .servicios h4 {
    padding-top: 0.2em;
    color: #000;
  }
  .servicios p {
    text-align: justify;
    padding-top: 1em;
  }
  .servicios .servicio {
    padding-bottom: 8em;
    opacity: 0.9;
    transition: 0.3s ease transform;
  }
  .servicios .servicio:hover {
    transform: scale(1.1);
    opacity: 1;
  }
</style>