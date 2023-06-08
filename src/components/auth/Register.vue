<template>
    <div class="register">
      <h1 class="title">Sign Up</h1>
      <form class="form" @submit.prevent="register">
        <label class="form-label" for="#name">Name:</label>
        <input
          v-model="userRegistro.name"
          class="form-input"
          type="name"
          id="name"
          required
          placeholder="Nombre"
        />
        <label class="form-label" for="#email">Email:</label>
        <input
          v-model="userRegistro.emailAddress"
          class="form-input"
          type="email"
          id="email"
          required
          placeholder="Email"
        />
        <label class="form-label" for="#password">Password:</label>
        <input
          v-model="userRegistro.password"
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
        />
        <label class="form-label" for="#role"
          >¿Qué tipo de usuario eres?:</label
        >
        <input
          v-model="userRegistro.role"
          class="form-input"
          type="role"
          id="role"
          placeholder="Escribe tu rol"
        />
        <label class="form-label" for="#password-repeat"
          >Repite la contraeña:</label
        >
        <input
          v-model="passwordRepeat"
          class="form-input"
          type="password"
          id="password-repeat"
          placeholder="Password"
        />
        <input class="form-submit" type="submit" value="Sign Up"> 
         <router-link :to="{ name: 'Login'}">¿Ya tienes cuenta?</router-link>       
      </form>
    </div>

  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { Registro } from '../../services/userService';
  import { userStore } from '@/store/app';
  import type { Register } from '../../interfaces/Users/IRegister'
  import Swal from "sweetalert2";
  
  const store = userStore();
  const userRegistro = ref({} as Register);
  const passwordRepeat= ref('');

     const register = () => {
      Registro(
        userRegistro.value.name,
        userRegistro.value.emailAddress,
        userRegistro.value.password,
        userRegistro.value.role)
      
        
        userRegistro.value.name = '';
        userRegistro.value.emailAddress= '';
        userRegistro.value.password= '';
        userRegistro.value.role= '';
      } 
        

</script>
  
  <style lang="scss" scoped>
  .register {
    padding: 2rem;
  }
  .title {
    text-align: center;
    color: white;
  }
  .form {
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    min-width: 350px;
    max-width: 100%;
    background: rgba(19, 35, 47, 0.9);
    border-radius: 5px;
    padding: 40px;
    box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
  }
  .form-label {
    margin-top: 2rem;
    color: white;
    margin-bottom: 0.5rem;
    &:first-of-type {
      margin-top: 0rem;
    }
  }
  .form-input {
    padding: 10px 15px;
    background: none;
    background-image: none;
    border: 1px solid white;
    color: white;
    &:focus {
      outline: 0;
      border-color: #1ab188;
    }
  }
  .form-submit {
    background: #1ab188;
    border: none;
    color: white;
    margin-top: 3rem;
    padding: 1rem 0;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: #0b9185;
    }
  }
  .error {
    margin: 1rem 0 0;
    color: #ff4a96;
  }
  </style>