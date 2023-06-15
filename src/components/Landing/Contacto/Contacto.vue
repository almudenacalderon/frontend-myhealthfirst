<template>
 
  <div>
    <section class="app" id="app">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-12 order-last content-app">
            <img :src=smartphone class="img-fluid" alt="smartphone" />
          </div>
          <div class="col-lg-8 col-md-8 col-sm-12 content-app">
            <h1>DOWNLOAD OUR APP</h1>
            <p>Si prefieres tenernos siempre a mano, descarga nuestra app desde la cual podrás acceder
              a tus rutinas y podrás conseguir puntos diarios que serán canjeables en futuras compras.
              ¡No te lo pierdas!</p>
            <a href="https://play.google.com"><img :src=google alt="google-app" /></a>
            <a href="https://www.apple.com"><img :src=app alt="app-store" /></a>
          </div>
        </div>
      </div>
    </section>

    <section class="contact-form" id="contact">
      <div class="container">
        <form>
          <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-12">
              <h1>Contacto</h1>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-12 right">
              <div class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Tu nombre" />
              </div>
              <div class="form-group">
                <input type="email" class="form-control form-control-lg" placeholder="tucorreo@gmail.com" />
              </div>
              <div class="form-group">
                <textarea class="form-control form-control-lg"/>
              </div>
              <input type="submit" class="btn btn-secondary btn-block" defaultValue="Enviar" />
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
 
</template>

<script setup lang="ts">
import google from '@/images/google-app.png';
import app from '@/images/app-store.png';
import smartphone from '@/images/smartphone.png';
</script>

<style lang="scss" scoped>

  /* Seccion App */
.app {
    margin: 4em 0;
    position: relative;
    padding-top: 6em;
    padding-bottom: 8em;
  }
  .app .content-app {
    margin: auto;
    padding-left: 50px;
  }
  .app .content-app h1 {
    padding-bottom: 40px;
    font-weight: bold;
    color: #e35722;
  }
  .app .content-app p {
    font-size: 1.2rem;
    padding-bottom: 30px;
    font-weight: 400;
    font-size: 1.1rem;
    text-align: justify;
    color: #000;
  }
  .app .content-app .buttons button {
    background: none;
    outline: none;
    border: none;
  }
  
  /* Seccion Contacto */
  .contact-form {
    background-color: #e4e4e4;
    padding-bottom: 8em;
    background-color: #e4e4e4;
    position: relative;
    padding-top: 10em;
    padding-left: 12em;
  }
  .contact-form h1 {
    padding: 2em 1px;
    color: #e35722;
    font-weight: bold;
  }
  .contact-form .right {
    max-width: 600px;
  }
  .contact-form .right .btn-secondary {
    background: #e35722;
    color: #000;
    border: 0;
  }
</style>