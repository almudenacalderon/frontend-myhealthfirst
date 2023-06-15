// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import("../views/Api.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () =>
      import("../layouts/AuthLayout.vue"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () =>
          import("../views/LoginView.vue"),
      },
      {
        path: "/register",
        name: "Register",
        component: () =>
          import("../views/RegisterView.vue"),
      },

    ]

  },
  {
    path: "/pantallas",
    name: "Pantalla",
    component: () =>
      import("../layouts/BasicLayout.vue"),
    children: [
      {
        path: "/micuentaC",
        name: "Cliente",
        component: () =>
          import("../views/ClienteView.vue"),
      },
      {
        path: "/micuentaE",
        name: "Entrenador",
        component: () =>
          import("../views/EntrenadorView.vue"),
      },
      {
        path: "/micuentaN",
        name: "Nutricionista",
        component: () =>
          import("../views/NutricionistaView.vue"),
      },
      {
        path: "/404",
        name: "Error",
        component: () =>
          import("../views/ErrorPageView.vue"),
      },
      {
        path: "/misrutinas",
        name: "Rutinas",
        component: () => import("../views/RutinasView.vue"),
      },
      {
        path: "/ejercicios",
        name: "Ejercicios",
        component: () => import("../views/EjerciciosView.vue"),
      },
      {
        path: "/dietas",
        name: "Dieta",
        component: () => import("../views/DietasView.vue"),
      },
    ]
  },
  {
    path: "/404",
    name: "Error",
    component: () =>
      import("../views/ErrorPageView.vue"),
  },

]
    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes,
    });

    export default router;
