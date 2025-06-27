import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/login", component: Login },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");

    // Se o usuário não está autenticado e não está indo para /login, redireciona para /login
    if (!token && to.path !== "/login") {
        next({ path: "/login" });
    }
    // Se o usuário está autenticado e tenta acessar /login, redireciona para a home
    else if (token && to.path === "/login") {
        next({ path: "/" });
    }
    // Caso contrário, permite a navegação normalmente
    else {
        next();
    }
});

export default router;
