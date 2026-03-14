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
    meta: { requiresAuth: true, allowedRoles: ["Admin"] },
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("../views/Chat.vue"),
    meta: {
      requiresAuth: true,
      allowedRoles: ["ADMIN", "BROKER", "DRIVER", "SHIPPER"],
    },
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
  const { isAuthenticated, user } = useAuth();

  if (to.name === "Login" && isAuthenticated.value) {
    next({ name: "Dashboard" });
  } else if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: "Login" });
  } else if (to.meta.allowedRoles) {
    const roles = to.meta.allowedRoles as string[];
    const userRole = user.value?.role;

    if (userRole && roles.includes(userRole)) {
      next();
    } else {
      alert("Доступ запрещен! У вас недостаточно прав для этого раздела.");
      next({ name: "Dashboard" });
    }
  } else {
    next();
  }
});

export default router;
