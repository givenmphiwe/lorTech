import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store/user";

import RegisterPage from "../pages/RegisterPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import DashboardPage from "../pages/HomePage.vue";

const routes = [
  { path: "/register", component: RegisterPage },
  { path: "/login", component: LoginPage },
  {
    path: "/dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  { path: "/", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.token) {
    next("/login");
  } else if (
    (to.path === "/login" || to.path === "/register") &&
    userStore.token
  ) {
    next("/dashboard");
  } else {
    next(); 
  }
});

export default router;


