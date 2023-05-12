<template>
    <section class="team" id="team">
  <div class="container">
    <h1 class="text-center">Equipo</h1>
    <div class="row">
      <div class="col-lg-3 col-md-3 col-sm-12 item">
        <img :src=l1 class="img-fluid" alt="team" />
        <div class="des">
          Sara
        </div>
        <span class="text-muted">Entrenadora</span>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-12 item">
        <img :src=l2 class="img-fluid" alt="team" />
        <div class="des">
          Chris
        </div>
        <span class="text-muted">Nutricionista deportivo</span>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-12 item">
        <img :src=l1 class="img-fluid" alt="team" />
        <div class="des">
          Layla
        </div>
        <span class="text-muted">Entrenadora de competición</span>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-12 item">
        <img :src=l2 class="img-fluid" alt="team" />
        <div class="des">
          J.Jirard
        </div>
        <span class="text-muted">Nutricionista clínico</span>
      </div>
    </div>
  </div>
</section>
</template>

<script setup lang="ts">
import l1 from '@/images/team-2.jpg';
import l2 from '@/images/team-3.jpg';
</script>

<style lang="scss" scoped>
/* Seccion Team */
.team {
    padding-top: 1.5em;
    padding-bottom: 5em;
    background-color: #e4e4e4;
    margin: 4em 0;
    position: relative;
  }
  .team h1 {
    color: #32cad7;
    margin: 2em;
    font-weight: bold;
  }
  .team .item {
    position: relative;
    overflow: hidden;
  }
  .team .item:hover .des {
    height: 100%;
    background: #32cad7;
    position: absolute;
    width: 90%;
    padding: 5em;
    opacity: 0.7;
    top: 0;
    border-top-right-radius: 0;
  }
  .team .des {
    background: #32cad7;
    color: rgb(98, 100, 101);
    font-weight: bolder;
    text-align: center;
    border-top-right-radius: 93%;
    transition: 0.3s ease-in-out;
    position: absolute;
    width: 88%;
    bottom: 24px;
  }
</style>