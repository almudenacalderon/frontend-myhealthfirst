// Utilities
import { Login } from '@/interfaces/Users/ILogin';
import { defineStore } from 'pinia'
import { Cliente } from '@/interfaces/ICliente';
import { Nutricionista } from '@/interfaces/INutricionista';
import { Entrenador } from '@/interfaces/IEntrenador';
import { GetNutricionists } from '@/services/nutricionistaService';
import { GetTrainers } from '@/services/entrenadorService';
import { GetClientes } from '@/services/clienteService';

export const userStore = defineStore('auth', {
  state: () => ({ //es como el data
   autenticado: false,
   listaClientes: [] as Cliente[],
   listaNutricionistas: [] as Nutricionista[],
   listaEntrenadores: [] as Entrenador[],
   clienteActual: '',
   trainerActual: '',
   nutriActual: '',
   clienteSelecionado: 0,
  }),

  getters: { //es como el computed 
    usuarioAutentificado: (state) => state.autenticado,
    getlistaClientes: (state) => state.listaClientes,
    getlistaNutricionistas: (state) => state.listaNutricionistas,
    getlistaEntrenadores: (state) => state.listaEntrenadores,
    getClienteNombre: (state) => {
      return (nombre: string) => {
        return state.listaClientes.find((c) => c.nombre == nombre)!;
      };
    },
    getClienteEmail: (state) => {
      return (email: string) => {
        return state.listaClientes.find((c) => c.email == email)!;
      };
    },
    getEntrenadorNombre: (state) => {
      return (nombre: string) => {
        return state.listaEntrenadores.find((c) => c.nombre == nombre)!;
      };
    },
    getEntrenadorEmail: (state) => {
      return (email: string) => {
        return state.listaEntrenadores.find((c) => c.email == email)!;
      };
    },
    getNutricionistaNombre: (state) => {
      return (nombre: string) => {
        return state.listaNutricionistas.find((c) => c.nombre == nombre)!;
      };
    },
    getNutricionistaEmail: (state) => {
      return (email: string) => {
        return state.listaNutricionistas.find((c) => c.email == email)!;
      };
    },
    GetclienteSelecionado: (state) =>
      state.listaClientes.find((c) => c.id == state.clienteSelecionado)!,
  },

  actions: { //es como method
    logoutUsuario() {
      this.autenticado = false
      this.clienteActual= '';
      this.trainerActual= '';
      this.nutriActual= '';
    },
    setClienteSelecionado(nombre: string) {
      this.clienteActual = nombre;
    },
    setClienteSelect(id: number) {
      this.clienteSelecionado = id;
    },
    setTrainerSelecionado(nombre: string) {
      this.trainerActual = nombre;
    },
    setNutriSelecionado(nombre: string) {
      this.nutriActual = nombre;
    },
   
    obtenerClientes() {
      GetClientes().then((data) => {
        this.listaClientes = data;
      });
    },
    obtenerEntrenadores() {
      GetTrainers().then((data) => {
        this.listaEntrenadores = data;
      });
    },
    obtenerNutricionistas() {
      GetNutricionists().then((data) => {
        this.listaNutricionistas = data;
      
      });
    },
    CargaDatosIniciales() {
      this.obtenerClientes();
      this.obtenerEntrenadores();
      this.obtenerNutricionistas();
    },
    
  }
});
