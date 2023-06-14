// Utilities
import { defineStore } from 'pinia'
import { Cliente } from '@/interfaces/ICliente';
import { Nutricionista } from '@/interfaces/INutricionista';
import { Entrenador } from '@/interfaces/IEntrenador';
import { GetNutricionists } from '@/services/nutricionistaService';
import { GetTrainers } from '@/services/entrenadorService';
import { GetClientes } from '@/services/clienteService';
import { GetDiets } from '@/services/dietasService';
import { Diet } from '@/interfaces/IDiet';
import { Training } from '@/interfaces/ITraining';
import { GetTrainings } from '@/services/trainingService';
import { GetExercises } from '@/services/exerciseService';
import { Exercise } from '@/interfaces/IExercise';
import { Meal } from '@/interfaces/IMeal';
import { GetMeals } from '@/services/mealService';

export const userStore = defineStore('auth', {
  state: () => ({ //es como el data
   autenticado: false,
   listaClientes: [] as Cliente[],
   listaNutricionistas: [] as Nutricionista[],
   listaEntrenadores: [] as Entrenador[],
   listaDietas: [] as Diet[],
   listaMeals: [] as Meal[],
   listaRutinas: [] as Training[],
   listaEjercicios: [] as Exercise[],
   clienteActual: '',
   trainerActual: '',
   nutriActual: '',
   clienteSelecionado: 0,
   nutriSeleccionado:0,
   trainerSeleccionado:0,
   ejercicioSeleccionado:0,
   rutinaSeleccionado:0,
   dietaSeleccionada:0,
   mealSeleccionada:0,
  }),

  getters: { //es como el computed 
    usuarioAutentificado: (state) => state.autenticado,

    getlistaClientes: (state) => state.listaClientes,
    getlistaNutricionistas: (state) => state.listaNutricionistas,
    getlistaEntrenadores: (state) => state.listaEntrenadores,
    getlistaDietas: (state) => state.listaDietas,
    getlistaRutinas: (state) => state.listaRutinas,
    getlistaEjercicios: (state) => state.listaEjercicios,
    getlistaMeals: (state) => state.listaMeals,


    getClienteNombre: (state) => {
      return (nombre: string) => {
        return state.listaClientes.find((c) => c.nombre == nombre)!;
      };
    },
    getClienteId: (state) => {
      return (id: number[]) => {
        return state.listaClientes.filter((c) => id.includes(c.id));
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
    
    GetnutriSelecionado: (state) =>
      state.listaNutricionistas.find((n) => n.id == state.nutriSeleccionado)!,

    GettrainerSelecionado: (state) =>
      state.listaEntrenadores.find((e) => e.id == state.trainerSeleccionado)!,

  GetEjerSelecionado: (state) =>
      state.listaEjercicios.find((e) => e.id == state.ejercicioSeleccionado)!,
  GetRutinaSelecionado: (state) =>
      state.listaRutinas.find((e) => e.id == state.rutinaSeleccionado)!,
      GetDietaSelecionado: (state) =>
      state.listaDietas.find((e) => e.id == state.dietaSeleccionada)!,
      GetMealSelecionado: (state) =>
      state.listaMeals.find((e) => e.id == state.mealSeleccionada)!,
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
    setTrainerSelect(id: number) {
      this.trainerSeleccionado = id;
    },
    setNutriSelecionado(nombre: string) {
      this.nutriActual = nombre;
    },
    setNutriSelect(id: number) {
      this.nutriSeleccionado = id;
    },
    setEjerSelect(id: number) {
      this.ejercicioSeleccionado = id;
    },
    setRutinaSelect(id: number) {
      this.rutinaSeleccionado = id;
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
    obtenerDietas() {
      GetDiets().then((data) => {
        this.listaDietas = data;
      });
    },
    obtenerMeals() {
      GetMeals().then((data) => {
        this.listaMeals = data;
      });
    },

    obtenerRutinas() {
      GetTrainings().then((data) => {
        this.listaRutinas = data;
      });
    },
    obtenerEjercicios() {
      GetExercises().then((data) => {
        this.listaEjercicios = data;
      });
    },
    CargaDatosIniciales() {
      this.obtenerClientes();
      this.obtenerEntrenadores();
      this.obtenerNutricionistas();
      this.obtenerDietas();
      this.obtenerRutinas();
      this.obtenerEjercicios();
    },
    
  }
});
