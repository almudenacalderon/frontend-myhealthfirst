<template>
  <div class="register">
    <h1 class="title">Sign Up</h1>
    <form class="form" @submit.prevent="register">
      <label class="form-label" for="#name">Nombre:</label>
      <input v-model="userRegistro.name" class="form-input" type="name" id="name" placeholder="Nombre" 
      @input="validateName(userRegistro.name)"/>
      <span class="error">{{ errors.name }}</span>
      <label class="form-label" for="#email">Email:</label>
      <input v-model="userRegistro.emailAddress" class="form-input" type="email" id="email"
        placeholder="Email" 
        @input="validateEmail(userRegistro.emailAddress)" 
        />
      <span class="error">{{ errors.emailAddress }}</span>
      <label class="form-label" for="#password">Password:</label>
      <input v-model="userRegistro.password" class="form-input" type="password" id="password" placeholder="Password"
       @input="validatePassword(userRegistro.password)" />
      <span class="error">{{ errors.password }}</span>
      <label class="form-label" for="#password-repeat">Repite la contraeña:</label>
      <input v-model="passwordRepeat" class="form-input" type="password" id="password-repeat" placeholder="Password" 
      @input="validatePasswordRepeat(passwordRepeat)" />
      <span v-if="errorP" class="error">{{ errorP }}</span>
      <label class="form-label">¿Qué tipo de usuario eres?</label>
      <div>
        <label class="title">
          <input type="radio" v-model="userRegistro.role" value="Cliente" @change="validateRol(userRegistro.role)" /> Cliente
        </label>
      </div>
      <div>
        <label class="title">
          <input type="radio" v-model="userRegistro.role" value="Entrenador" @change="validateRol(userRegistro.role)" /> Entrenador
        </label>
      </div>
      <div>
        <label class="title">
          <input type="radio" v-model="userRegistro.role" value="Nutricionista" @change="validateRol(userRegistro.role)"/> Nutricionista
        </label>
      </div>
      <span class="error">{{ errors.role }}</span>

      <input class="form-submit" type="submit" value="Sign Up">
      <router-link to="Login" class="router-link">¿Ya tienes cuenta?</router-link>
    </form>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { Registro } from '../../services/userService';
import { userStore } from '@/store/app';
import type { Register } from '../../interfaces/Users/IRegister'
import router from '@/router';
import Swal from 'sweetalert2';

const store = userStore();
const userRegistro = ref({} as Register);
const passwordRepeat = ref('');
const errors = ref<Record<string, string>>({});
const errorP = ref('')


const validatePassword = (password: string) => {
  if (!password) {
    errors.value.password = 'La contraseña es requerida';
  } else if (password.length < 8) {
    errors.value.password = 'La contraseña debe tener al menos 8 caracteres';
  } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    errors.value.password = 'La contraseña debe contener al menos una letra mayúscula y una letra minúscula';
  } else if (!/[0-9]/.test(password)) {
    errors.value.password = 'La contraseña debe contener al menos un número';
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.value.password = 'La contraseña debe contener al menos un símbolo especial';
  } else {
    errors.value.password = ''; // No hay error, se borra el mensaje de error
  }
};
const validatePasswordRepeat = (passwordRepeat: string ) => {
  errorP.value = '';
  if (!passwordRepeat) {
    errorP.value = 'Debes repetir la contraseña';
  } else if  (userRegistro.value.password !== passwordRepeat) {
      errorP.value = 'Las contraseñas no son las mismas';
} else {
    errorP.value= ''; // No hay error, se borra el mensaje de error
  }
}
const validateEmail = (emailAddress: string) => {
  if (!emailAddress) {
    errors.value.emailAddress = 'El email es requerido';
  }
  else {
    errors.value.emailAddress= '';
  }
} 
const validateName = (name: string) => {
  if (!name) {
    errors.value.name = 'El nombre es requerido';
  }
  else {
    errors.value.name= '';
  }
} 

const validateRol = (role: string) => {
  if (!role) {
    errors.value.role = 'Debes seleccionar un rol';
  }
  else {
    errors.value.role='';
  }
} 

const register = () => {

   if (!userRegistro.value.role) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes seleccionar un rol',
    })
    return;
   }
 
     Registro(
      userRegistro.value.name,
      userRegistro.value.emailAddress,
      userRegistro.value.password,
      userRegistro.value.role)

    userRegistro.value.name = '';
    userRegistro.value.emailAddress = '';
    userRegistro.value.password = '';
    userRegistro.value.role = '';
    store.CargaDatosIniciales();
    router.push("/login");
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
    border-color: #e35722;
  }
}

.form-submit {
  background: #e35722;
  border: none;
  color: white;
  margin-top: 1rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #d03d07;
  }
}
.router-link {
  color: rgba(166, 165, 218, 0.9);
  text-decoration: none; 
}

.router-link:hover {
  color: #e35722; 
}
.error {
      color: red;
    }
</style>