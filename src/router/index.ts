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
        import("../views/auth/Login.vue"),
      },
      {
        path: "/register",
        name: "Register",
        component: () =>
        import("../views/auth/Register.vue"),
      },
      ]
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
