<template>
    <div class="modal-background" @click.self="emit('onClose')">
      <div class="modal-container">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header"></slot>
            <!-- <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="emit('onClose')"
            ></button> -->
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-body">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits(['onClose']);
  </script>
  
  <style scoped>
  .modal-background {
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
     display: flex; 
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
    padding-left: 20%;
    padding-top: 5%;
  }
  
  .modal-container {
    width: 102%;
    height: 100%;
    overflow:scroll;
    padding-right: 5%;
  }
  .modal-container::-webkit-scrollbar {
    width: 3px;
    opacity: 0;
    visibility: hidden;
  }
  
  /* Mostrar las barras de desplazamiento al pasar el ratón sobre el contenedor */
  .modal-container:hover::-webkit-scrollbar {
    opacity: 1;
    visibility: visible;
  }
  .modal-content{
    margin-top: 10px;
    height: 80vh;
  }
  
  .modal-body{
     border-radius: 3px 3px 3px 3px;
     background-color: white;
  }
  .modal-header{
    background-color: lightgray;

  }
  
  </style>