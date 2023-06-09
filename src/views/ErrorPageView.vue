<template>
    <div class="not-found">
      <div class="error-container">
        <span class="mdi mdi-emoticon-confused custom-icon"></span>  
        <h1 class="error-title">¡Ups!</h1>
        <h2 class="error-subtitle">Página no encontrada</h2>
        <p class="error-message">Lo sentimos, la página que estás buscando no existe.</p>
        <router-link to="/" class="error-link">Volver a la página de inicio</router-link>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #d0cccce8;
  }
  
  .error-container {
    text-align: center;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  .custom-icon {
  font-size: 64px;
  color: #ff4d4f;
  margin-bottom: 20px;
}

  
  .error-title {
    font-size: 48px;
    color: #ff4d4f;
    margin-bottom: 10px;
  }
  
  .error-subtitle {
    font-size: 36px;
    margin-bottom: 20px;
  }
  
  .error-message {
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .error-link {
    color: #1890ff;
    font-size: 16px;
    text-decoration: none;
  }
  
  .error-link:hover {
    text-decoration: underline;
  }
  </style>