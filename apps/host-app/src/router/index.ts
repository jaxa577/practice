import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuth } from "@jonyrepo/auth";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/AdminPanel.vue"),
    meta: { requiresAuth: true, role: "Admin" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard
router.beforeEach((to, _, next) => {
  const { isAuthenticated, hasRole } = useAuth();

  if (to.name === "Login" && isAuthenticated.value) {
    next({ name: "Dashboard" });
  } else if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: "Login" });
  } else if (to.meta.role && !hasRole(to.meta.role as string)) {
    alert("Access Denied! Your role is insufficient!");
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
