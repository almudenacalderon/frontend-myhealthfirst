<template>
  <div class="login">
    <h1 class="title">Login <v-btn variant="text" to="/" class="router-link">
    <v-icon>mdi-home</v-icon>
  </v-btn></h1>
    <form class="form" @submit.prevent="login">
      <label class="form-label" for="#email">Email:</label>
      <input v-model="userLogin.email" class="form-input" type="email" id="email" placeholder="Email" />
      <label class="form-label" for="#password">Password:</label>
      <input v-model="userLogin.password" class="form-input" type="password" id="password" placeholder="Password" />
      <p v-if="error" class="error">
        Has introducido mal el email o la contraseña.
      </p>
      <input class="form-submit" type="submit" value="Login" />
      <router-link to="/register" class="router-link">¿No tienes cuenta?</router-link>
    </form>
  </div>
</template>
    
  
<script setup lang="ts">
import { ref } from 'vue';
import { userStore } from '@/store/app';
import { Loggeo } from '../../services/userService';
import type { Login } from '../../interfaces/Users/ILogin'
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
const router = useRouter();
const store = userStore();
store.CargaDatosIniciales();
const userLogin = ref({} as Login);
let error = ref(false);

async function login() {
  if (userLogin.value.password == "" || userLogin.value.email == "") {
    error.value = true;
  }
  try {
    const response = await Loggeo(
      userLogin.value.email,
      userLogin.value.password
    )
    if (response.result) {
      store.autenticado = true;
      const cliente = store.getClienteEmail(userLogin.value.email);
      const trainer = store.getEntrenadorEmail(userLogin.value.email);
      const nutricionista = store.getNutricionistaEmail(userLogin.value.email);
      let rol = "";
  
      if (cliente) {
        rol = cliente.role;
        store.setClienteSelecionado(cliente.nombre)
        store.setClienteSelect(cliente.id)
      } else if (trainer) {
        rol = trainer.role;
        store.setTrainerSelecionado(trainer.nombre)
        store.setTrainerSelect(trainer.id)
      } else if (nutricionista) {
        rol = nutricionista.role;
        store.setNutriSelecionado(nutricionista.nombre)
        store.setNutriSelect(nutricionista.id)
      }
      console.log(rol)

      // Redireccionar al usuario a la pantalla correspondiente según su rol
      switch (rol) {
        case "Cliente":
          router.push('/micuentaC');
          break;
        case "Entrenador":
          router.push('/micuentaE');
          break;
        case "Nutricionista":
          router.push('/micuentaN');
          break;
        default:
          router.push('/404');
          break;
      };
    }

  } catch (error) {
    error = true;
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'La contraseña o el correo no es correcto',
    })
    console.error("Error en el login:");
    store.autenticado = false;
  }
  userLogin.value.email = '';
  userLogin.value.password = '';
}

</script>
  
<style lang="scss" scoped>
.login {
  padding: 2rem;
}

.title {
  text-align: center;
  color: white;
  padding-left: 1.7em;
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
    border-color: #c45e00;
  }
}
.router-link {
  color: rgba(166, 165, 218, 0.9);
  text-decoration: none;
}

.router-link:hover {
  color: #e35722;
}
.form-submit {
  background: #e35722;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #c45e00;
  }
}
</style>